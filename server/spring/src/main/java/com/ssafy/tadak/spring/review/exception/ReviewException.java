package com.ssafy.tadak.spring.review.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.ConflictException;
import com.ssafy.tadak.spring.common.exception.status.ForbiddenException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;

public class ReviewException {

    public static class ReviewBadRequestException extends BadRequestException {
        public ReviewBadRequestException(ReviewErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

    public static class ReviewNotFoundException extends NotFoundException {
        public ReviewNotFoundException(ReviewErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

    public static class ReviewForbiddenException extends ForbiddenException {
        public ReviewForbiddenException(ReviewErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

    public static class ReviewConflictException extends ConflictException {
        public ReviewConflictException(ReviewErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
