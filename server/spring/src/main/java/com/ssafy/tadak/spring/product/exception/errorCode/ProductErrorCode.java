package com.ssafy.tadak.spring.product.exception.errorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductErrorCode {

    PRODUCT_NOT_FOUND("P4001", "제품을 찾을 수 없습니다."),
    PRODUCT_DETAIL_NOT_FOUND("P4002", "제품 상세 정보를 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
