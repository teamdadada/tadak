package com.ssafy.tadak.spring.product.controller;

import com.ssafy.tadak.spring.product.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tadak.spring.product.dto.response.ProductDetailResponse;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{product_type}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(
            @PathVariable("product_type") ProductType productType,
            @RequestParam("product_id") Long productId) {

        ProductDetailResponse response = productService.getProductDetail(productType, productId);
        return ResponseEntity.ok(response);
    }
}
