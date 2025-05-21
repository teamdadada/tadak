package com.ssafy.tadak.spring.product.dto.request.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record BareboneListRequest(
        List<String> manufacturer,
        List<String> keyLayout,
        List<String> features,
        Integer minPriceMin,
        Integer minPriceMax
) implements ProductListRequest {

    @Override
    public Map<String, List<String>> toMap() {
        Map<String, List<String>> map = new HashMap<>();
        if (manufacturer != null && !manufacturer.isEmpty()) map.put("manufacturer", manufacturer);
        if (keyLayout != null && !keyLayout.isEmpty()) map.put("keyLayout", keyLayout);
        if (features != null && !features.isEmpty()) map.put("features", features);
        return map;
    }
}
