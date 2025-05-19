package com.ssafy.tadak.spring.keyboard.dto.response;

import lombok.Builder;

@Builder
public record GetKeyboardModelResponse (
        Long keyboardId,
        String model3dUrl
){
}
