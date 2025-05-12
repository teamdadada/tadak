package com.ssafy.tadak.spring.keyboard.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record CreateKeyboardRequest (
        String keyboardName,
        MultipartFile keyboardImage,
        Integer keyboardPrice,
        String keyboardColor,
        List<Long> partOptionIdList //partOptionId
){
}
