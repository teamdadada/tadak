package com.ssafy.tadak.spring.placement.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.ForbiddenException;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;

public class PlacementException {
    public static class PlacementForbiddenException extends ForbiddenException {
        public PlacementForbiddenException(PlacementErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }

    public static class PlacementNotFoundException extends NotFoundException {
        public PlacementNotFoundException(PlacementErrorCode errorCode) {
            super(new ErrorCode(errorCode.errorcode, errorCode.message));
        }
    }
}
