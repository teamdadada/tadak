package com.ssafy.tadak.spring.minio.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.ConflictException;
import com.ssafy.tadak.spring.common.exception.status.ForbiddenException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;
import com.ssafy.tadak.spring.common.exception.status.UnauthorizedException;

public class ImageException {

    public static class ImageBadRequestException extends BadRequestException {
        public ImageBadRequestException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class ImageNotFoundException extends NotFoundException {
        public ImageNotFoundException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
}
