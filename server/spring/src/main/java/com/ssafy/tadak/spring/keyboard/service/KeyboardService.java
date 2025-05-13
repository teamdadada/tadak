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
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.entity.Model;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.domain.repository.ModelJpaRepository;
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
    private final ModelJpaRepository modelJpaRepository;
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
            String keyboardColor,
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

        //파일 엔티티 조회
        Image image=null;
        Model model=null;

        if(thumbnailId != null) {
            image = imageJpaRepository.findById(thumbnailId)
                    .orElseThrow(()->new MinioException.MinioNotFoundException(FILE_NOTFOUND));
        }

        if(modelId != null) {
            model = modelJpaRepository.findById(modelId)
                    .orElseThrow(()->new MinioException.MinioNotFoundException(FILE_NOTFOUND));
        }

        //키보드 생성
        Keyboard newKeyboard = keyboardJpaRepository.save(
                                    Keyboard.builder()
                                            .userId(userId)
                                            .name(keyboardName)
                                            .thumbnail(image)
                                            .model(model)
                                            .price(keyboardPrice)
                                            .color(keyboardColor)
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
        Image thumbnail = null;
        thumbnail = keyboard.getThumbnail();
        String thumbnailUrl=null;
        if(thumbnail != null) {
            thumbnailUrl = minioUtil.getImageUrl(thumbnail.getBucket(), thumbnail.getFilePath());
        }
        //모델 불러오기
        Model model = null;
        model = keyboard.getModel();
        String model3dUrl=null;
        if(model != null) {
            model3dUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
        }


        //키보드 옵션 저장
        List<Map<String, Long>> options = new ArrayList<>();
        Map<String, Long> op = new HashMap<>();

        //키보드에 선택된 옵션들 확인
        List<KeyboardOption> keyboardOptions = keyboardOptionJpaRepository.findAllByKeyboard(keyboard);

        //키보드에 선택된 제품 옵션들 정보 <카테고리, 제품 상세>
        Map<String, KeyboardDetailResponse.SelectedProduct> selectedProducts = new HashMap<>();
        for(KeyboardOption option : keyboardOptions){
            KeycapOption product = option.getPartOption();
            Option type = product.getPartType();
            //카테고리별 선택 옵션
            op.put(type.getCategory(), type.getId());
            
            if(product == null) continue;
            
            Option partType = product.getPartType();

            Image image = product.getImage();
            String imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());

            selectedProducts.put(partType.getCategory(), new KeyboardDetailResponse.SelectedProduct(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getQuantity(),
                    imageUrl
            ));
        }
        options.add(op);

        return new KeyboardDetailResponse(
                keyboardId,
                keyboard.getName(),
                options,
                keyboard.getColor(),
                selectedProducts,
                thumbnailUrl,
                model3dUrl
        );
    }

    private boolean isValidQuantity(
            BareboneOption bareboneOption,
            SwitchOption switchOption,
            KeycapOption keycapOption
    ) {
        if(bareboneOption.getQuantity() < 1){
            throw new KeyboardException.KeyboardConflictException(PART_OPTION_CONFLICT);
        }
    }

    private void createKeyboardOption(Keyboard newKeyboard, List<Long> optionIdList) {
        List<Option> options = optionJpaRepository.findAllById(optionIdList);
        for(Option option : options) {

            keyboardOptionJpaRepository.save(
                    KeyboardOption.builder()
                            .keyboard(newKeyboard)
                            .option(option))
                            .build()
            );
        }
    }
}
