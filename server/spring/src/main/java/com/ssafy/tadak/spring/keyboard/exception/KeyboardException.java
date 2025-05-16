package com.ssafy.tadak.spring.keyboard.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.ConflictException;
import com.ssafy.tadak.spring.common.exception.status.ForbiddenException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;
import com.ssafy.tadak.spring.common.exception.status.UnauthorizedException;

public class KeyboardException {

    public static class KeyboardBadRequestException extends BadRequestException {
        public KeyboardBadRequestException(KeyboardErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class KeyboardNotFoundException extends NotFoundException {
        public KeyboardNotFoundException(KeyboardErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class KeyboardConflictException extends ConflictException {
        public KeyboardConflictException(KeyboardErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
    public static class KeyboardForbiddenException extends ForbiddenException {
        public KeyboardForbiddenException(KeyboardErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class KeyboardUnauthorizedException extends UnauthorizedException {
        public KeyboardUnauthorizedException(KeyboardErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
}
