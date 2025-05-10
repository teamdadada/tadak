package com.ssafy.tadak.spring.review.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum ReviewErrorCode {
    // 403
    REVIEW_IS_NOT_MINE("R4030", "본인이 작성한 리뷰가 아닙니다."),

    // 404
    REVIEW_NOT_FOUND("R4040", "존재하지 않는 리뷰입니다."),

    // 409
    REVIEW_IS_ALREADY_EXIST("R4090", "이미 리뷰를 작성한 상품입니다.");

    private final String code;
    private final String message;

    ReviewErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
