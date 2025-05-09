package com.ssafy.tadak.spring.keyboard.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class KeyboardService {

    /** 커스텀 키보드를 생성하는 메소드입니다.
     * 유저가 선택한 옵션에 따른 키보드를 생성합니다.
     * **/
    public void createKeyboard(
            Long userId,
            String keyboardName,
            MultipartFile keyboardImage,
            Integer keyboardPrice,
            String keyboardColor
    ) {
        if(userId == null) {
            //todo: exception
        }
    }
}
