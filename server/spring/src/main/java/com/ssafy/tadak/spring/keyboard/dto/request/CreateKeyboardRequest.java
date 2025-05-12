package com.ssafy.tadak.spring.keyboard.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record CreateKeyboardRequest (
        String keyboardName,
        MultipartFile keyboardImage,
        Integer keyboardPrice,
        String keyboardColor,
        Integer partType,
        Integer partOptionId
){
}
