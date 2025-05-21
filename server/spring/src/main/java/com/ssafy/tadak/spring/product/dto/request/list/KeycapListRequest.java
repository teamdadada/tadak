package com.ssafy.tadak.spring.product.dto.request.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record KeycapListRequest(
        List<String> keycapMaterial,
        List<String> keyCount,
        Integer minPriceMin,
        Integer minPriceMax
) implements ProductListRequest {

    @Override
    public Map<String, List<String>> toMap() {
        Map<String, List<String>> map = new HashMap<>();
        if (keycapMaterial != null && !keycapMaterial.isEmpty()) map.put("keycapMaterial", keycapMaterial);
        if (keyCount != null && !keyCount.isEmpty()) map.put("keyCount", keyCount);
        return map;
    }
}
