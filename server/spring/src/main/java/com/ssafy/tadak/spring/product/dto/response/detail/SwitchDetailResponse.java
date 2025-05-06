package com.ssafy.tadak.spring.product.dto.response.detail;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.entity.Switch;

import java.util.Optional;

public record SwitchDetailResponse(
        Long productId,
        String name,
        Integer releaseYear,
        Integer releaseMonth,
        String manufacturer,
        String quantity,
        String switchType,
        String keyForce,
        int minPrice,
        String thumbnail,
        String detailImage,
        String url,
        int hits
) implements ProductDetailResponse {

    public static SwitchDetailResponse from(Product product, Switch switchProduct) {
        return new SwitchDetailResponse(
                product.getProductId(),
                switchProduct.getName(),
                switchProduct.getReleaseYear(),
                switchProduct.getReleaseMonth(),
                switchProduct.getManufacturer(),
                switchProduct.getQuantity(),
                switchProduct.getSwitchType(),
                switchProduct.getKeyForce(),
                Optional.ofNullable(switchProduct.getMinPrice()).orElse(0),
                switchProduct.getThumbnail(),
                switchProduct.getDetailImage(),
                switchProduct.getUrl(),
                product.getHits()
        );
    }
}


