package com.ssafy.tadak.spring.keyboard.dto.request;

public record UpdateKeyboardProductRequest (
        Long bareboneId,
        Long switchId,
        Long keycapId
){
}
