package com.ssafy.tadak.spring.product.dto.response;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.entity.Switch;

public record SwitchDetailResponse(
        Long productId,
        String name,
        String manufacturer,
        String registeredDate,
        String quantity,
        String switchType,
        String keyForce,
        String minPrice,
        String thumbnail,
        String detailImage,
        String url,
        int hits
) implements ProductDetailResponse {
    public static SwitchDetailResponse from(Product product, Switch switchProduct) {
        return new SwitchDetailResponse(
                product.getProductId(),
                switchProduct.getName(),
                switchProduct.getManufacturer(),
                switchProduct.getRegisteredDate(),
                switchProduct.getQuantity(),
                switchProduct.getSwitchType(),
                switchProduct.getKeyForce(),
                switchProduct.getMinPrice(),
                switchProduct.getThumbnail(),
                switchProduct.getDetailImage(),
                switchProduct.getUrl(),
                product.getHits()
        );
    }
}


