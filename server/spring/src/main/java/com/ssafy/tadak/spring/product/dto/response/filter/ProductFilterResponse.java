package com.ssafy.tadak.spring.product.dto.response.filter;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.List;
import java.util.Map;

public record ProductFilterResponse(
        @JsonValue
        Map<String, List<String>> filters
) {
}
