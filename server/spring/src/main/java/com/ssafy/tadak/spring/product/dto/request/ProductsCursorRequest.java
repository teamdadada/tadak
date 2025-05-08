package com.ssafy.tadak.spring.product.dto.request;

import com.ssafy.tadak.spring.product.util.enums.SortType;
import org.springframework.web.bind.annotation.RequestParam;

public record ProductsCursorRequest(
    String cursor,
    int size,
    SortType sort
) {
}
