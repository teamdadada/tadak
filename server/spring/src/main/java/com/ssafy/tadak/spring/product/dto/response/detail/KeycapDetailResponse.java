package com.ssafy.tadak.spring.product.dto.response.detail;

import com.ssafy.tadak.spring.product.domain.entity.Keycap;
import com.ssafy.tadak.spring.product.domain.entity.Product;

import java.util.Optional;

public record KeycapDetailResponse(
        Long productId,
        String name,
        Integer releaseYear,
        Integer releaseMonth,
        String keycapMaterial,
        String engravingPosition,
        String keyCount,
        int minPrice,
        String thumbnail,
        String detailImage,
        String url,
        int hits
) implements ProductDetailResponse {

    public static KeycapDetailResponse from(Product product, Keycap keycap) {
        return new KeycapDetailResponse(
                product.getProductId(),
                keycap.getName(),
                keycap.getReleaseYear(),
                keycap.getReleaseMonth(),
                keycap.getKeycapMaterial(),
                keycap.getEngravingPosition(),
                keycap.getKeyCount(),
                Optional.ofNullable(keycap.getMinPrice()).orElse(0),
                keycap.getThumbnail(),
                keycap.getDetailImage(),
                keycap.getUrl(),
                product.getHits()
        );
    }
}

