package com.ssafy.tadak.spring.keyboard.dto.request;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public record UpdateKeyboardRequest (
        String name,
        Long thumbnailId,
        Long modelId,
        Integer totalPrice,
        Colors colors,
        @NotNull
        List<Long> options,
        Long bareboneId,
        Long switchId,
        Long keycapId
){
}
