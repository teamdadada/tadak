package com.ssafy.tadak.spring.keyboard.dto.request;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public record CreateKeyboardRequest (
        String name,
        @NotNull
        Long thumbnailId,
        @NotNull
        Long modelId,
        Integer totalPrice,
        Colors colors,
        List<Long> options,
        Long bareboneId,
        Long switchId,
        Long keycapId
){
}
