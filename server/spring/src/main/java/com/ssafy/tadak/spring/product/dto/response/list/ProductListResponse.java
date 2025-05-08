package com.ssafy.tadak.spring.product.dto.response.list;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.List;

public record ProductListResponse(
        String lastCursor,
        boolean hasNext,
        int count,
        List<ProductSimpleDto> list
) {
        public static ProductListResponse of(List<ProductSimpleDto> data, int sizeLimit) {
                String last = data.get(data.size() - 1).cursor();
                boolean hasNext = data.size() == sizeLimit;
                return new ProductListResponse(last, hasNext, data.size(), data);
        }
}
