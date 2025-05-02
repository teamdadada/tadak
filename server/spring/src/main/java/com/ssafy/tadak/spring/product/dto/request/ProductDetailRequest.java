package com.ssafy.tadak.spring.product.dto.request;

import com.ssafy.tadak.spring.product.util.enums.ProductType;

public record ProductDetailRequest(
	ProductType productType,
	Long productId
) {
}
