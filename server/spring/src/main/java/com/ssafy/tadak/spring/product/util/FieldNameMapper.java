package com.ssafy.tadak.spring.product.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FieldNameMapper {

    // Request의 경우 camelCase 지만, MongoDB의 경우 snake_case 라 상호 변환 필요
    private static final Map<String, String> camelToSnake = Map.ofEntries(
            Map.entry("keycapMaterial", "keycap_material"),
            Map.entry("engravingPosition", "engraving_position"),
            Map.entry("keyCount", "key_count"),
            Map.entry("quantity", "quantity"),
            Map.entry("switchType", "switch_type"),
            Map.entry("keyForce", "key_force"),
            Map.entry("manufacturer", "manufacturer"),
            Map.entry("keyLayout", "key_layout"),
            Map.entry("features", "features")
    );

    public static String toSnake(String camelCase) {
        return camelToSnake.getOrDefault(camelCase, camelCase); // 못 찾으면 그대로 반환
    }

    public static Map<String, List<String>> convertKeysToSnakeCase(Map<String, List<String>> camelCaseMap) {
        return camelCaseMap.entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> toSnake(entry.getKey()),
                        Map.Entry::getValue
                ));
    }
}
