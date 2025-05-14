package com.ssafy.tadak.spring.keyboard.service;

import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeycapOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.Option;
import com.ssafy.tadak.spring.keyboard.domain.entity.SwitchOption;
import com.ssafy.tadak.spring.keyboard.domain.repository.BareboneJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeycapOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.OptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.SwitchOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.dto.OptionDto;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.tadak.spring.keyboard.exception.KeyboardErrorCode.*;
import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
public class KeyboardService {
    private final KeyboardJpaRepository keyboardJpaRepository;
    private final KeyboardOptionJpaRepository keyboardOptionJpaRepository;
    private final ImageJpaRepository imageJpaRepository;
    private final MinioUtil minioUtil;
    private final BareboneJpaRepository bareboneJpaRepository;
    private final SwitchOptionJpaRepository switchOptionJpaRepository;
    private final KeycapOptionJpaRepository keycapOptionJpaRepository;
    private final OptionJpaRepository optionJpaRepository;

    /** 커스텀 키보드를 생성하는 메소드입니다.
     * 유저가 선택한 옵션에 따른 키보드를 생성합니다.
     * **/
    public String createKeyboard(
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
        BareboneOption bareboneOption = null;
        SwitchOption switchOption = null;
        KeycapOption keycapOption = null;

        bareboneOption = bareboneJpaRepository.findById(bareboneId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        switchOption = switchOptionJpaRepository.findById(switchId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND));
        keycapOption = keycapOptionJpaRepository.findById(keycapId)
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
        return newKeyboard.getId()+" "+newKeyboard.getName();
    }

    /** 키보드 상세 조회 **/
    public KeyboardDetailResponse getKeyboardDetail(
            Long userId,
            Long keyboardId
    ) throws Exception {
        Keyboard keyboard = keyboardJpaRepository.findById(keyboardId)
                .orElseThrow(()->new KeyboardException.KeyboardNotFoundException(KEYBOARD_NOTFOUND));

        if (!keyboard.getUserId().equals(userId)) {
            throw new KeyboardException.KeyboardUnauthorizedException(KEYBOARD_FORBIDDEN);
        }

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
