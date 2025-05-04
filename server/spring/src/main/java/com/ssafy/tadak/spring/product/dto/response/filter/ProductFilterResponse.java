package com.ssafy.tadak.spring.product.dto.response.filter;

import java.util.List;
import java.util.Map;

public record ProductFilterResponse(
        Map<String, List<String>> filters
) {
}
