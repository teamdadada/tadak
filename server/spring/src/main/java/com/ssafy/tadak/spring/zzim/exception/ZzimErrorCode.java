package com.ssafy.tadak.spring.zzim.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;

public enum ZzimErrorCode {

    // 404
    ZZIM_NOT_FOUND("Z4040", "존재하지 않는 찜 상품입니다."),

    // 409
    ZZIM_ALREADY_EXIST("Z4090", "이미 찜 등록한 상품입니다.");

    private final String code;
    private final String message;

    ZzimErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
