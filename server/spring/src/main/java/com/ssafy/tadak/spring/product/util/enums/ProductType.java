package com.ssafy.tadak.spring.product.util.enums;

public enum ProductType {
	BAREBONE("barebone_specs"),
	SWITCH("switch_specs"),
	KEYCAP("keycap_specs");

	private final String productType;

	ProductType(String productType) {
		this.productType = productType;
	}

	@Override
	public String toString() {
		return productType;
	}
}
