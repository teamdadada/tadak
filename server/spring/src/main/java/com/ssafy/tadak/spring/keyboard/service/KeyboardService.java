package com.ssafy.tadak.spring.keyboard.service;

import com.ssafy.tadak.spring.cart.domain.entity.CartItem;
import com.ssafy.tadak.spring.cart.domain.repository.CartItemJpaRepository;
import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.GlobalException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;
import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Category;
import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeycapOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Option;
import com.ssafy.tadak.spring.keyboard.domain.entity.SwitchOption;
import com.ssafy.tadak.spring.keyboard.domain.repository.BareboneOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.CategoryJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeycapOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.OptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.SwitchOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.dto.KeyboardUpdateDto;
import com.ssafy.tadak.spring.keyboard.dto.OptionDto;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardListResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardModelResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetOptionsResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetProductListResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardCreateResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import com.ssafy.tadak.spring.keyboard.mapper.KeyboardMapper;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import com.ssafy.tadak.spring.keyboard.converter.ProductConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.tadak.spring.keyboard.exception.KeyboardErrorCode.*;
import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KeyboardService {
    private final KeyboardJpaRepository keyboardJpaRepository;
    private final KeyboardOptionJpaRepository keyboardOptionJpaRepository;
    private final ImageJpaRepository imageJpaRepository;
    private final MinioUtil minioUtil;
    private final SwitchOptionJpaRepository switchOptionJpaRepository;
    private final KeycapOptionJpaRepository keycapOptionJpaRepository;
    private final OptionJpaRepository optionJpaRepository;
    private final CategoryJpaRepository categoryJpaRepository;
    private final BareboneOptionJpaRepository bareboneOptionJpaRepository;
    private final ProductConverter productConverter;
    private final KeyboardMapper keyboardMapper;
    private final CartItemJpaRepository cartItemJpaRepository;

    //todo: 중복 썸네일, 모델,  에러처리
    /** 커스텀 키보드를 생성하는 메소드입니다.
     * 유저가 선택한 옵션에 따른 키보드를 생성합니다.
     * 모델과 썸네일은 One to One 관계이므로 같은 id로 요청할 경우
     * 에러를 발생시킵니다.
     * **/
    @Transactional
    public KeyboardCreateResponse createKeyboard(
            Long userId,
            String keyboardName,
            Long thumbnailId,
            Long modelId,
            Integer keyboardPrice,
            Colors keyboardColor,
            List<Long> optionIdList,
            Long bareboneId,
            Long switchId,
            Long keycapId
    ) {
        BareboneOption bareboneOption = bareboneOptionJpaRepository.findById(bareboneId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        SwitchOption switchOption = switchOptionJpaRepository.findById(switchId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        KeycapOption keycapOption = keycapOptionJpaRepository.findById(keycapId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        //수량 확인
        isValidQuantity(bareboneOption, switchOption, keycapOption);

        //파일 엔티티 조회
        Image image = imageJpaRepository.findById(thumbnailId)
                .orElseThrow(()->new MinioException.MinioNotFoundException(FILE_NOTFOUND));


        Image model = imageJpaRepository.findById(modelId)
                .orElseThrow(()->new MinioException.MinioNotFoundException(FILE_NOTFOUND));

        //키보드 생성
        Keyboard newKeyboard = keyboardJpaRepository.save(
                                    Keyboard.builder()
                                            .userId(userId)
                                            .name(keyboardName)
                                            .thumbnail(image)
                                            .model(model)
                                            .price(keyboardPrice)
                                            .color(keyboardColor)
                                            .bareboneOption(bareboneOption)
                                            .keycapOption(keycapOption)
                                            .switchOption(switchOption)
                                            .build()
                                    );

        //키보드-옵션 생성
        createKeyboardOption(newKeyboard, optionIdList);
        return new KeyboardCreateResponse(newKeyboard.getId(), newKeyboard.getName());
    }

    /** 키보드 리스트 조회
     * 유저가 생성한 키보드들의 간단한 정보들을 반환합니다.
     * 생성일 기준 오름차순으로 반환합니다.
     * **/
    public List<GetKeyboardListResponse> getKeyboardList(Long userId){
        List<Keyboard> userKeyboardList = keyboardJpaRepository.findAllByUserIdOrderByCreatedAtAsc((userId));

        if(userKeyboardList.isEmpty()){
            return List.of();
        }

        return userKeyboardList.stream()
                .map(keyboard -> {
                    Image thumbnail = keyboard.getThumbnail();
                    String imageUrl = null;
                    if(thumbnail != null){
                        try {
                            imageUrl = minioUtil.getImageUrl(thumbnail.getBucket(), thumbnail.getFilePath());
                        } catch (Exception e){
                            throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
                        }
                    }
                     return new GetKeyboardListResponse(
                             keyboard.getId(),
                             keyboard.getName(),
                             imageUrl
                     );
                })
                .toList();
    }

    /** 키보드 상세 조회
     * 키보드 생성 시 선택했던 옵션, 색상, 부품 정보를 함께 반환합니다.
     * **/
    public GetKeyboardDetailResponse getKeyboardDetail(
            Long userId,
            Long keyboardId
    ) {
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        //썸네일 불러오기
        Image thumbnail = keyboard.getThumbnail();
        String thumbnailUrl=null;

        //모델 불러오기
        Image model = keyboard.getModel();
        String model3dUrl=null;

        try{
            if(thumbnail!=null) {
                thumbnailUrl = minioUtil.getImageUrl(thumbnail.getBucket(), thumbnail.getFilePath());
            }
            if(model!=null) {
                model3dUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
            }
        }catch (Exception e){
            throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
        }

        //키보드 <옵션, id>를 저장하는 리스트
        List<OptionDto.SelectedOption> options = getOptionDto(keyboard);

        //부품 조회
        BareboneOption bareboneOption = keyboard.getBareboneOption();
        SwitchOption switchOption = keyboard.getSwitchOption();
        KeycapOption keycapOption = keyboard.getKeycapOption();

        //키보드에 선택된 부품들 정보 <부품타입, 부품상세>
        Map<String, GetKeyboardDetailResponse.SelectedProduct> selectedProducts = getProductMap(bareboneOption, switchOption, keycapOption);

        return new GetKeyboardDetailResponse(
                keyboardId,
                keyboard.getName(),
                options,
                keyboard.getColors(),
                selectedProducts,
                thumbnailUrl,
                model3dUrl
        );
    }

    /** 키보드 모델 조회
     * 키보드 3D 모델 경로를 반환합니다.
     * **/
    public GetKeyboardModelResponse getKeyboardModel(
            Long userId,
            Long keyboardId
    ) {
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        Image model = keyboard.getModel();
        String model3dUrl=null;
        try{
            model3dUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
        }catch (Exception e){
            throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
        }

        return GetKeyboardModelResponse.builder()
                .keyboardId(keyboardId)
                .model3dUrl(model3dUrl)
                .build();
    }

    /** 키보드 옵션 수정
     * 커스텀 키보드 옵션을 업데이트하는 메소드입니다.
     * 기존 옵션들을 모두 지우고 옵션을 다시 저장합니다.
     * **/
    @Transactional
    public void updateKeyboard(
            Long userId,
            Long keyboardId,
            String name,
            Long thumbnailId,
            Long modelId,
            Integer totalPrice,
            Colors colors,
            List<Long> options,
            Long bareboneId,
            Long switchId,
            Long keycapId
    ) throws Exception {
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        if(options == null || options.isEmpty()){
            throw new KeyboardException.KeyboardBadRequestException(BADREQUEST);
        }
        //기존 옵션들 삭제
        keyboardOptionJpaRepository.deleteAllByKeyboard(keyboard);
        //새로운 옵션 등록
        createKeyboardOption(keyboard, options);

        //옵션 유효성 검증
        Image thumbnail = null;
        Image model = null;

        // todo: 이미지 커스텀 오류로 변경
        if(thumbnailId != null){
            //기존 이미지 삭제
            Image cur = keyboard.getThumbnail();
            minioUtil.deleteFile(cur.getFilePath(), cur.getBucket().getName());
            imageJpaRepository.deleteById(thumbnailId);
            //테이블에 이미지가 존재하는지 체크
            thumbnail = imageJpaRepository.findById(thumbnailId)
                    .orElseThrow(()->new NotFoundException(new ErrorCode("I4040","이미지를 찾을 수 없습니다.")));
        }
        if(modelId != null){
            //기존 모델 이미지 삭제
            Image cur = keyboard.getModel();
            minioUtil.deleteFile(cur.getFilePath(), cur.getBucket().getName());
            imageJpaRepository.deleteById(modelId);
            //테이블에 이미지가 존재하는지 체크
            model = imageJpaRepository.findById(modelId)
                    .orElseThrow(()->new NotFoundException(new ErrorCode("I4040","이미지를 찾을 수 없습니다.")));
        }

        BareboneOption bareboneOption = null;
        KeycapOption keycapOption = null;
        SwitchOption switchOption = null;

        if(bareboneId != null){
            bareboneOption = bareboneOptionJpaRepository.findById(bareboneId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        }
        if(switchId != null){
            switchOption = switchOptionJpaRepository.findById(switchId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        }
        if(keycapId != null){
            keycapOption = keycapOptionJpaRepository.findById(keycapId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        }
        
        //키보드 정보 업데이트 (mapstruct 적용)
        keyboardMapper.updateKeyboardFromDto(
                KeyboardUpdateDto.builder()
                        .name(name)
                        .thumbnail(thumbnail)
                        .model(model)
                        .price(totalPrice)
                        .colors(colors)
                        .bareboneOption(bareboneOption)
                        .switchOption(switchOption)
                        .keycapOption(keycapOption)
                        .build(),
                keyboard
        );
    }

    /** 키보드 제품 변경
     * 커스텀 키보드에 선택한 제품을 변경합니다.
     * **/
    @Transactional
    public void updateKeyboardProduct(
            Long userId,
            Long keyboardId,
            Long bareboneId,
            Long keycapId,
            Long switchId
    ){
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        if(bareboneId != null){
            BareboneOption bareboneOption = bareboneOptionJpaRepository.findById(bareboneId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
            keyboard.setBareboneOption(bareboneOption);
        }

        if(keycapId != null){
            KeycapOption keycapOption = keycapOptionJpaRepository.findById(keycapId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
            keyboard.setKeycapOption(keycapOption);
        }

        if(switchId != null){
            SwitchOption switchOption = switchOptionJpaRepository.findById(switchId)
                    .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
            keyboard.setSwitchOption(switchOption);
        }
    }

    @Transactional
    public void deleteKeyboard(Long userId, Long keyboardId) throws Exception {
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        List<CartItem> item = cartItemJpaRepository.getReferenceByKeyboard(keyboard);

        if(item != null && item.size() > 0){
            for(CartItem cartItem : item){
                cartItemJpaRepository.deleteById(cartItem.getId());
            }
        }

        keyboardJpaRepository.delete(keyboard);
    }

    // fixme: 카테고리 추가 시 확장성 없음
    /** 커스텀 키보드 옵션 조회
     * 커스텀 키보드 생성 시 선택 가능한 옵션들을 반환합니다.
     * **/
    public GetOptionsResponse getAllOptions(){
        List<Category> category = categoryJpaRepository.findAll();

        List<GetOptionsResponse.OptionName> layouts = null;
        List<GetOptionsResponse.OptionName> materials = null;
        List<GetOptionsResponse.OptionName> switchTypes = null;

        for(Category c : category){
            //카테고리는 레이아웃, 재질 스위치가 있음 -> DB에 case 옵션대로 이름 들어가 있어야 함.
            List<Option> op = optionJpaRepository.findAllByCategory(c);

            switch (c.getName().toLowerCase()){
                case "layout":
                    layouts = getOptionList(op);
                    break;
                case "material":
                    materials = getOptionList(op);
                    break;
                case "switchtype":
                    switchTypes = getOptionList(op);
            }
        }

        GetOptionsResponse.Barebone bareboneOp = new GetOptionsResponse.Barebone(layouts, materials);
        GetOptionsResponse.Switch switchOp = new GetOptionsResponse.Switch(switchTypes);
        GetOptionsResponse.Keycap keycapOp = new GetOptionsResponse.Keycap();

        return new GetOptionsResponse(bareboneOp, switchOp, keycapOp);
    }

    /** 제품을 검색하는 메소드입니다.
     * 선택한 옵션에 따라 제품을 조회합니다.
     * **/
    public List< GetProductListResponse> getSwitchList(
            Long typeId
    ) {
        List<SwitchOption> switchOptions = switchOptionJpaRepository.findAllByType(typeId);
        return productConverter.convertToProductInfoList(switchOptions);

    }

    public List<GetProductListResponse> getBareboneList(
            Long layout,
            Long material
    ) {
        List<BareboneOption> bareboneOptions = bareboneOptionJpaRepository
                                                .findAllByLayoutAndMaterial(layout,material);
        return productConverter.convertToProductInfoList(bareboneOptions);
    }

    public List<GetProductListResponse> getKeycapList() {
        List<KeycapOption> keyboardOptions = keycapOptionJpaRepository.findAll();
        return productConverter.convertToProductInfoList(keyboardOptions);
    }

    /** 키보드 불러오기
     * 키보드를 레포지토리에서 가져오고 유저가 만든 키보드가 맞는지 확인합니다.
     * **/
    @NotNull
    private Keyboard getKeyboard(Long userId, Long keyboardId) {
        Keyboard keyboard = keyboardJpaRepository.findById(keyboardId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(KEYBOARD_NOTFOUND));

        if (!keyboard.getUserId().equals(userId)) {
            throw new KeyboardException.KeyboardUnauthorizedException(KEYBOARD_FORBIDDEN);
        }
        return keyboard;
    }

    /** 키보드 선택 옵션 불러오기
     *  이미 생성되어 있는 키보드에서 선택되어 있는 옵션들을 반환하는 메서드입니다.
     * **/
    private List<OptionDto.SelectedOption> getOptionDto(Keyboard keyboard) {
        OptionDto.SelectedOption selectedOption = new OptionDto.SelectedOption();

        //키보드에 선택된 옵션들 확인
        BareboneOption bareboneOption = keyboard.getBareboneOption();
        //dto에 바인딩
        selectedOption.setBareboneOption(
                new OptionDto.Barebone(
                        bareboneOption.getLayout(),
                        bareboneOption.getMaterial()
                )
        );

        //스위치
        SwitchOption switchOption = keyboard.getSwitchOption();
        selectedOption.setSwitchOption(
                new OptionDto.Switch(
                        switchOption.getType()
                )
        );

        List<OptionDto.SelectedOption> result = new ArrayList<>();
        result.add(selectedOption);

        return result;
    }

    /** 제품 수량이 1개 이상인자 확인합니다. **/
    private boolean isValidQuantity(
            BareboneOption bareboneOption,
            SwitchOption switchOption,
            KeycapOption keycapOption
    ) {
        if(bareboneOption.getQuantity() < 1
                || switchOption.getQuantity() < 1
                || keycapOption.getQuantity() < 1
        ){
            throw new KeyboardException.KeyboardConflictException(PART_OPTION_CONFLICT);
        }
        return true;
    }

    /**
     * 키보드 옵션들을 카테고리별로 정리하기 위한 메소드입니다.
     * **/
    private List<GetOptionsResponse.OptionName> getOptionList(List<Option> op){
        List<GetOptionsResponse.OptionName> options = new ArrayList<>();

        for(Option o : op){
            options.add(new GetOptionsResponse.OptionName(o.getId(), o.getOptionName()));
        }
        return options;
    }

    private void createKeyboardOption(Keyboard newKeyboard, List<Long> optionIdList) {
        List<Option> options = optionJpaRepository.findAllById(optionIdList);
        for(Option option : options) {

            keyboardOptionJpaRepository.save(
                    KeyboardOption.builder()
                            .keyboard(newKeyboard)
                            .option(option)
                            .build()
            );
        }
    }

    // fixme: 옵션 확장성 없음. 리팩토링 필요
    private Map<String, GetKeyboardDetailResponse.SelectedProduct> getProductMap(
            BareboneOption bareboneOption,
            SwitchOption switchOption,
            KeycapOption keycapOption
    ) {
        Map<String, GetKeyboardDetailResponse.SelectedProduct> result = new HashMap<>();

        if(bareboneOption != null) {
            //배어본 옵션 상세
            Image bareboneImage = bareboneOption.getImage();
            String bareboneImageUrl = null;
            try{
                if(bareboneImage != null) {
                    bareboneImageUrl = minioUtil.getImageUrl(bareboneImage.getBucket(), bareboneImage.getFilePath());
                }
            }catch (Exception e){
                throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
            }

            GetKeyboardDetailResponse.SelectedProduct selectedBarebone = new GetKeyboardDetailResponse.SelectedProduct(
                    bareboneOption.getId(),
                    bareboneOption.getName(),
                    bareboneOption.getPrice(),
                    bareboneOption.getQuantity(),
                    bareboneImageUrl
            );
            result.put("barebone", selectedBarebone);
        }


        if(switchOption != null) {
            //스위치 옵션 상세
            Image switchImage = switchOption.getImage();
            String switchImageUrl = null;

            try{
                if(switchImage != null) {
                    switchImageUrl = minioUtil.getImageUrl(switchImage.getBucket(), switchImage.getFilePath());
                }
            }catch (Exception e){
                throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
            }

            GetKeyboardDetailResponse.SelectedProduct selectedSwitch = new GetKeyboardDetailResponse.SelectedProduct(
                    switchOption.getId(),
                    switchOption.getName(),
                    switchOption.getPrice(),
                    switchOption.getQuantity(),
                    switchImageUrl
            );
            result.put("switch", selectedSwitch);
        }


        if(keycapOption != null) {
            //키캡 옵션 상세
            Image keycapImage = keycapOption.getImage();
            String keycapImageUrl = null;

            try{
                if(keycapImage != null) {
                    keycapImageUrl =  minioUtil.getImageUrl(keycapImage.getBucket(), keycapImage.getFilePath());
                }
            }catch (Exception e){
                throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
            }

            GetKeyboardDetailResponse.SelectedProduct selectedKeycap = new GetKeyboardDetailResponse.SelectedProduct(
                    keycapOption.getId(),
                    keycapOption.getName(),
                    keycapOption.getPrice(),
                    keycapOption.getQuantity(),
                    keycapImageUrl
            );
            result.put("keycap", selectedKeycap);
        }

        return result;
    }
}
