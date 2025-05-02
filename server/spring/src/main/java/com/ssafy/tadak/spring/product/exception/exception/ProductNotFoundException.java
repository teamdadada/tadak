package com.ssafy.tadak.spring.product.exception.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.product.exception.errorCode.ProductErrorCode;

public class ProductNotFoundException extends BadRequestException {
	public ProductNotFoundException(Long productId) {
		super(new ErrorCode(ProductErrorCode.PRODUCT_NOT_FOUND.getCode(),
			ProductErrorCode.PRODUCT_NOT_FOUND.getMessage() + " product_id = " + productId));
	}
}
