package com.ssafy.tadak.spring.common.exception.status;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class ConflictException extends GlobalException {
    public ConflictException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.CONFLICT);
    }
}
