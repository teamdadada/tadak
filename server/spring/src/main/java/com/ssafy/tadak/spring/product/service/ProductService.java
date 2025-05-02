package com.ssafy.tadak.spring.product.service;

import com.ssafy.tadak.spring.product.dto.request.ProductDetailRequest;
import com.ssafy.tadak.spring.product.dto.response.ProductDetailResponse;

public interface ProductService {

	ProductDetailResponse getProductDetail(ProductDetailRequest request);

}
