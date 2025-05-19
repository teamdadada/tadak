package com.ssafy.tadak.spring.keyboard.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record GetProductListResponse(
        Long productId,
        String name,
        Integer price,
        Integer quantity,
        String imageUrl
) {
}
