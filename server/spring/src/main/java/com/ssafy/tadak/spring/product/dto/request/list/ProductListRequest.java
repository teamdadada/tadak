package com.ssafy.tadak.spring.product.dto.request.list;

import java.util.List;
import java.util.Map;

public interface ProductListRequest {

    Map<String, List<String>> toMap();

    Integer minPriceMin();

    Integer minPriceMax();
}
