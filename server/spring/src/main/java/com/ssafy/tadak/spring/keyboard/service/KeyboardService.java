package com.ssafy.tadak.spring.keyboard.service;

import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Category;
import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeycapOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Option;
import com.ssafy.tadak.spring.keyboard.domain.entity.SwitchOption;
import com.ssafy.tadak.spring.keyboard.domain.repository.BareboneJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.CategoryJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeycapOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.OptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.SwitchOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.dto.OptionDto;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import com.ssafy.tadak.spring.keyboard.dto.response.GetOptionsResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardCreateResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
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
    private final BareboneJpaRepository bareboneJpaRepository;
    private final SwitchOptionJpaRepository switchOptionJpaRepository;
    private final KeycapOptionJpaRepository keycapOptionJpaRepository;
    private final OptionJpaRepository optionJpaRepository;
    private final CategoryJpaRepository categoryJpaRepository;

    /** 커스텀 키보드를 생성하는 메소드입니다.
     * 유저가 선택한 옵션에 따른 키보드를 생성합니다.
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
        BareboneOption bareboneOption = bareboneJpaRepository.findById(bareboneId)
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
                                            .cartId(null)
                                            .build()
                                    );

        //키보드-옵션 생성
        createKeyboardOption(newKeyboard, optionIdList);
        return new KeyboardCreateResponse(newKeyboard.getId(), newKeyboard.getName());
    }

    /** 키보드 상세 조회
     * 키보드 생성 시 선택했던 옵션, 색상, 부품 정보를 함께 반환합니다.
     * **/
    public KeyboardDetailResponse getKeyboardDetail(
            Long userId,
            Long keyboardId
    ) throws Exception {
        Keyboard keyboard = getKeyboard(userId, keyboardId);

        //썸네일 불러오기
        Image thumbnail = keyboard.getThumbnail();
        String thumbnailUrl=null;
        if(thumbnail!=null) {
            thumbnailUrl = minioUtil.getImageUrl(thumbnail.getBucket(), thumbnail.getFilePath());
        }

        //모델 불러오기
        Image model = keyboard.getModel();
        String model3dUrl=null;
        if(model!=null) {
            model3dUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
        }

        //키보드 <옵션, id>를 저장하는 리스트
        List<OptionDto.SelectedOption> options = getOptionDto(keyboard);

        //부품 조회
        BareboneOption bareboneOption = keyboard.getBareboneOption();
        SwitchOption switchOption = keyboard.getSwitchOption();
        KeycapOption keycapOption = keyboard.getKeycapOption();

        //키보드에 선택된 부품들 정보 <부품타입, 부품상세>
        Map<String, KeyboardDetailResponse.SelectedProduct> selectedProducts = getProductMap(bareboneOption, switchOption, keycapOption);

        return new KeyboardDetailResponse(
                keyboardId,
                keyboard.getName(),
                options,
                keyboard.getColors(),
                selectedProducts,
                thumbnailUrl,
                model3dUrl
        );
    }

    @Transactional
    public void updateKeyboard(Long userId, Long keyboardId){
        Keyboard keyboard = getKeyboard(userId, keyboardId);
    }

    // todo: @Transactional DeleteKeyboard

    // fixme: 확장성 없음
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

            switch (c.getName()){
                case "layout":
                    layouts = getOptionList(op);
                    break;
                case "material":
                    materials = getOptionList(op);
                    break;
                case "switchType":
                    switchTypes = getOptionList(op);
            }
        }

        GetOptionsResponse.Barebone bareboneOp = new GetOptionsResponse.Barebone(layouts, materials);
        GetOptionsResponse.Switch switchOp = new GetOptionsResponse.Switch(switchTypes);
        GetOptionsResponse.Keycap keycapOp = new GetOptionsResponse.Keycap();

        return new GetOptionsResponse(bareboneOp, switchOp, keycapOp);
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
    private Map<String, KeyboardDetailResponse.SelectedProduct> getProductMap(
            BareboneOption bareboneOption,
            SwitchOption switchOption,
            KeycapOption keycapOption
    ) throws Exception {
        Map<String, KeyboardDetailResponse.SelectedProduct> result = new HashMap<>();

        if(bareboneOption != null) {
            //배어본 옵션 상세
            Image bareboneImage = bareboneOption.getImage();
            String bareboneImageUrl = null;
            if(bareboneImage != null) {
                bareboneImageUrl = minioUtil.getImageUrl(bareboneImage.getBucket(), bareboneImage.getFilePath());
            }

            KeyboardDetailResponse.SelectedProduct selectedBarebone = new KeyboardDetailResponse.SelectedProduct(
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
            if(switchImage != null) {
                switchImageUrl = minioUtil.getImageUrl(switchImage.getBucket(), switchImage.getFilePath());
            }

            KeyboardDetailResponse.SelectedProduct selectedSwitch = new KeyboardDetailResponse.SelectedProduct(
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
            if(keycapImage != null) {
                keycapImageUrl =  minioUtil.getImageUrl(keycapImage.getBucket(), keycapImage.getFilePath());
            }

            KeyboardDetailResponse.SelectedProduct selectedKeycap = new KeyboardDetailResponse.SelectedProduct(
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
