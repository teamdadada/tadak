package com.ssafy.tadak.spring.review.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum ReviewErrorCode {
    // 400
    REVIEW_BAD_REQUEST("R4000", "요청을 처리하는 데 필요한 인자가 잘못되었습니다."),
    REVIEW_BAD_SORTTYPE("R4001", "잘못된 정렬 인자가 전달되었습니다."),

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
