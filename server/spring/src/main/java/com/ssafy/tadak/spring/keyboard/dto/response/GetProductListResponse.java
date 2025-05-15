package com.ssafy.tadak.spring.keyboard.dto.response;

import lombok.Builder;

import java.util.List;

public record GetProductListResponse(
        List<ProductInfo> products
) {
    @Builder
    public record ProductInfo(
            Long productId,
            String name,
            Integer price,
            Integer quantity,
            String imageUrl
    ){}
}
