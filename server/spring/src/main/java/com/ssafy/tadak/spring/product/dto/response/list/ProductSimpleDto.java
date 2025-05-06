package com.ssafy.tadak.spring.product.dto.response.list;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

public record ProductSimpleDto(
        Long productId,
        String name,
        Integer minPrice,
        String thumbnail,
        ProductType type
) {

    public static ProductSimpleDto from(Product product, Integer minPrice, String thumbnail) {
        return new ProductSimpleDto(
                product.getProductId(),
                product.getProductName(),
                minPrice,
                thumbnail,
                product.getProductType()
        );
    }
}
