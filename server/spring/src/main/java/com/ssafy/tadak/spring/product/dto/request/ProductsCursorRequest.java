package com.ssafy.tadak.spring.product.dto.request;

import com.ssafy.tadak.spring.common.enums.SortType;

public record ProductsCursorRequest(
    String cursor,
    int size,
    SortType sort
) {
}
