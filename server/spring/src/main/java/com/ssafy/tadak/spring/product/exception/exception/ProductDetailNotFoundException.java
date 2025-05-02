package com.ssafy.tadak.spring.product.exception.exception;

import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.product.exception.errorCode.ProductErrorCode;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

public class ProductDetailNotFoundException extends BadRequestException {
	public ProductDetailNotFoundException(Long productId, ProductType type) {
		super(new ErrorCode(
			ProductErrorCode.PRODUCT_DETAIL_NOT_FOUND.getCode(),
			ProductErrorCode.PRODUCT_DETAIL_NOT_FOUND.getMessage() + " (type=" + type + ", id=" + productId + ")"
		));
	}
}

