package com.ssafy.tadak.spring.product.dto.response.list;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.List;

public record ProductListResponse(
        @JsonValue
        List<ProductSimpleDto> list
) {
}
