package com.ssafy.tadak.spring.product.exception.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.product.exception.errorCode.ProductErrorCode;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

public class ProductException {

    public static class ProductBadRequestException extends BadRequestException {

        public ProductBadRequestException(ProductErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
