package com.ssafy.tadak.spring.keyboard.service;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.PartOption;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.PartOptionJpaRepository;
import com.ssafy.tadak.spring.keyboard.domain.repository.PartTypeJpaRepository;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.tadak.spring.keyboard.exception.KeyboardErrorCode.PART_OPTION_CONFLICT;
import static com.ssafy.tadak.spring.keyboard.exception.KeyboardErrorCode.PART_OPTION_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
public class KeyboardService {
    private final KeyboardJpaRepository keyboardJpaRepository;
    private final KeyboardOptionJpaRepository keyboardOptionJpaRepository;
    private final PartOptionJpaRepository partOptionJpaRepository;
    private final PartTypeJpaRepository partTypeJpaRepository;

    /** 커스텀 키보드를 생성하는 메소드입니다.
     * 유저가 선택한 옵션에 따른 키보드를 생성합니다.
     * **/
    public String createKeyboard(
            Long userId,
            String keyboardName,
            MultipartFile keyboardImage,
            Integer keyboardPrice,
            String keyboardColor,
            List<Long> partOptionIdList
    ) {
        //부품 옵션 조회
        List<PartOption> partOptions = partOptionJpaRepository.findAllById(partOptionIdList);

        if(partOptionIdList.size() != partOptions.size()) {
            throw new KeyboardException.KeyboardNotFoundException(PART_OPTION_NOTFOUND);
        }

        // todo: 이미지 업로드
        String imageUrl="";

        //키보드 생성
        Keyboard newKeyboard = keyboardJpaRepository.save(
                                    Keyboard.builder()
                                            .userId(userId)
                                            .name(keyboardName)
                                            .imageUrl(imageUrl)
                                            .price(keyboardPrice)
                                            .color(keyboardColor)
                                            .cartId(null)
                                            .build()
                                    );

        //키보드-옵션 생성
        for(PartOption partOption : partOptions) {
            if(partOption.getQuantity() < 1){
                throw new KeyboardException.KeyboardConflictException(PART_OPTION_CONFLICT);
            }

            keyboardOptionJpaRepository.save(
                    KeyboardOption.builder()
                            .keyboard(newKeyboard)
                            .partOption(partOption)
                            .build()
            );
        }
        return newKeyboard.getName();
    }
}
