package com.ssafy.tadak.spring.product.dto.response;

public sealed interface ProductDetailResponse permits SwitchDetailResponse, KeycapDetailResponse, BareboneDetailResponse {
}

