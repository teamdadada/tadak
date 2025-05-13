package com.ssafy.tadak.spring.keyboard.dto.request;

import java.util.List;

public record CreateKeyboardRequest (
        String name,
        Long thumbnailId,
        Long modelId,
        Integer totalPrice,
        String colors,
        List<Long> selectedOptions,
        Long bareboneId,
        Long switchId,
        Long keycapId
){
}
