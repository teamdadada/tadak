package com.ssafy.tadak.spring.zzim.exception;

import com.ssafy.tadak.spring.common.exception.status.ConflictException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;

public class ZzimException {

    public static class ZzimNotFoundException extends NotFoundException {
        public ZzimNotFoundException(ZzimErrorCode errorCode) {
            super(errorCode.toErrorCode());
        }
    }

    public static class ZzimConflictException extends ConflictException {
        public ZzimConflictException(ZzimErrorCode errorCode) {
            super(errorCode.toErrorCode());
        }
    }
}
