package com.ssafy.tadak.spring.common.exception.status;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class ForbiddenException extends GlobalException {
    public ForbiddenException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.FORBIDDEN);
    }
}
