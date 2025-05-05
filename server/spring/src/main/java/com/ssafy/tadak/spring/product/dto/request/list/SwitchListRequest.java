package com.ssafy.tadak.spring.product.dto.request.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record SwitchListRequest(
        List<String> quantity,
        List<String> switchType,
        List<String> keyForce,
        Integer minPriceMin,
        Integer minPriceMax
) implements ProductListRequest {

    @Override
    public Map<String, List<String>> toMap() {
        Map<String, List<String>> map = new HashMap<>();
        if (quantity != null && !quantity.isEmpty()) map.put("quantity", quantity);
        if (switchType != null && !switchType.isEmpty()) map.put("switchType", switchType);
        if (keyForce != null && !keyForce.isEmpty()) map.put("keyForce", keyForce);
        return map;
    }
}
