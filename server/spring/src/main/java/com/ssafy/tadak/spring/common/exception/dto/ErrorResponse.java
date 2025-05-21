package com.ssafy.tadak.spring.common.exception.dto;

import com.ssafy.tadak.spring.common.exception.ErrorCode;

public record ErrorResponse (
        String code,
        String message
){
    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.code(), errorCode.message());
    }
}
