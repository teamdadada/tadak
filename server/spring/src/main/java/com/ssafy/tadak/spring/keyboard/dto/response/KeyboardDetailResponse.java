package com.ssafy.tadak.spring.keyboard.dto.response;

import com.ssafy.tadak.spring.keyboard.dto.OptionDto;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;

import java.util.List;
import java.util.Map;

public record KeyboardDetailResponse(
        Long keyboardId,
        String name,
        List<OptionDto.SelectedOption> options,
        Colors colors,
        Map<String, SelectedProduct> selectedProducts,
        String thumbnailUrl,
        String model3dUrl

) {
    public record SelectedProduct(
            Long productId,
            String name,
            Integer price,
            Integer quantity,
            String imageUrl
    ) {}
}
