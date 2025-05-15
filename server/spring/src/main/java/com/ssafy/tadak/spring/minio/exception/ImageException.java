package com.ssafy.tadak.spring.minio.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;

public class ImageException {

    public static class ImageBadRequestException extends BadRequestException {
        public ImageBadRequestException(ImageErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class ImageNotFoundException extends NotFoundException {
        public ImageNotFoundException(ImageErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
}
