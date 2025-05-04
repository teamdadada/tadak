package com.ssafy.tadak.spring.product.dto.response.detail;

public sealed interface ProductDetailResponse permits SwitchDetailResponse, KeycapDetailResponse, BareboneDetailResponse {
}

