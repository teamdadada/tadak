package com.ssafy.tadak.spring.product.dto.response;

import com.ssafy.tadak.spring.product.domain.entity.Keycap;
import com.ssafy.tadak.spring.product.domain.entity.Product;

public record KeycapDetailResponse(
        Long productId,
		String name,
        String keycapMaterial,
        String engravingPosition,
        String keyCount,
        String minPrice,
        String thumbnail,
        String detailImage,
        String url,
		int hits
) implements ProductDetailResponse {
    public static KeycapDetailResponse from(Product product, Keycap keycap) {
        return new KeycapDetailResponse(
                product.getProductId(),
                keycap.getName(),
                keycap.getKeycapMaterial(),
                keycap.getEngravingPosition(),
                keycap.getKeyCount(),
                keycap.getMinPrice(),
                keycap.getThumbnail(),
                keycap.getDetailImage(),
                keycap.getUrl(),
                product.getHits()
        );
    }
}

