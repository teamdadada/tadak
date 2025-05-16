package com.ssafy.tadak.spring.minio.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.ConflictException;
import com.ssafy.tadak.spring.common.exception.status.ForbiddenException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;
import com.ssafy.tadak.spring.common.exception.status.UnauthorizedException;

public class MinioException {

    public static class MinioBadRequestException extends BadRequestException {
        public MinioBadRequestException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class MinioNotFoundException extends NotFoundException {
        public MinioNotFoundException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class MinioConflictException extends ConflictException {
        public MinioConflictException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
    public static class MinioForbiddenException extends ForbiddenException {
        public MinioForbiddenException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class MinioUnauthorizedException extends UnauthorizedException {
        public MinioUnauthorizedException(MinioErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
}
