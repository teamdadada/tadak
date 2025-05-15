package com.ssafy.tadak.spring.product.dto.response.list;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.common.enums.SortType;

import java.util.Map;

public record ProductSimpleDto(
        Long productId,
        String name,
        Integer minPrice,
        String thumbnail,
        Integer hits,
        ProductType type,
        @JsonIgnore String cursor
) {

    public static ProductSimpleDto from(Map<String, Object> specs, ProductType type, SortType sort) {
        return new ProductSimpleDto(
                getLong(specs, "product_id"),
                (String) specs.get("name"),
                getInteger(specs, "min_price"),
                (String) specs.get("thumbnail"),
                getInteger(specs, "hit"),
                type,
                (String) specs.get(sort == SortType.LATEST ? "latest_sort_key" : "popular_sort_key")
        );
    }

    public static ProductSimpleDto from(Product specs) {
        return new ProductSimpleDto(
                specs.getProductId(),
                specs.getProductName(),
                null,
                null,
                specs.getHits(),
                specs.getProductType(),
                String.format("%d_%d", specs.getHits(), specs.getProductId())
        );
    }


    private static Integer getInteger(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Number num) return num.intValue();
        return null;
    }

    private static Long getLong(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Number num) return num.longValue();
        return null;
    }
}
