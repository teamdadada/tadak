package com.ssafy.tadak.spring.product.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class ProductFilterUtil {
    public static <T> Map<String, List<String>> getProductFilter(List<T> items, Map<String, Function<T, ?>> fieldExtractors) {
        Map<String, Map<String, Integer>> counts = new HashMap<>();

        for (Map.Entry<String, Function<T, ?>> entry : fieldExtractors.entrySet()) {
            String key = entry.getKey();
            Function<T, ?> extractor = entry.getValue();

            Map<String, Integer> countMap = counts.computeIfAbsent(key, k -> new HashMap<>());
            for (T item : items) {
                Object value = extractor.apply(item);
                if (value instanceof String strVal) {
                    if (!strVal.isBlank())
                        countMap.merge(strVal, 1, Integer::sum);
                } else if (value instanceof Collection<?> listVal) {
                    for (Object v : listVal) {
                        if (v instanceof String s && !s.isBlank())
                            countMap.merge(s, 1, Integer::sum);
                    }
                }
            }
        }

        Map<String, List<String>> result = new HashMap<>();
        for (var entry : counts.entrySet()) {
            result.put(entry.getKey(), sortByCountDesc(entry.getValue()));
        }

        return result;
    }

    public static List<String> sortByCountDesc(Map<String, Integer> countMap) {
        return countMap.entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .map(Map.Entry::getKey)
                .toList();
    }
}
