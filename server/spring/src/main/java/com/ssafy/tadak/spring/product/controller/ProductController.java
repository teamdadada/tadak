package com.ssafy.tadak.spring.product.controller;

import com.ssafy.tadak.spring.product.dto.request.list.BareboneListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.KeycapListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.SwitchListRequest;
import com.ssafy.tadak.spring.product.dto.response.filter.ProductFilterResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductListResponse;
import com.ssafy.tadak.spring.product.service.ProductService;
import org.springframework.http.ResponseEntity;

import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    /**
     * 제품 상세정보를 조회합니다.
     *
     * @param productType 제품 타입
     * @param productId   제품 번호
     * @return 제품 상세 정보
     */
    @PostMapping("/{product_type}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(
            @PathVariable("product_type") ProductType productType,
            @RequestParam("product_id") Long productId) {
        ProductDetailResponse response = productService.getProductDetail(productType, productId);
        return ResponseEntity.ok(response);
    }

    /**
     * 현재 가지고 있는 제품의 타입별 필터 리스트를 가져옵니다.
     *
     * @param productType 제품 타입
     * @return 제품의 타입별 필터 리스트
     */
    @GetMapping("/{product_type}/filter")
    public ResponseEntity<ProductFilterResponse> getProductFilter(
            @PathVariable("product_type") ProductType productType) {
        ProductFilterResponse response = productService.getProductFilter(productType);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{product_type}/latest")
    public ResponseEntity<ProductListResponse> getLatest(
            @PathVariable("product_type") ProductType type,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            @ModelAttribute BareboneListRequest bareboneFilter,
            @ModelAttribute SwitchListRequest switchFilter,
            @ModelAttribute KeycapListRequest keycapFilter) {
        ProductListResponse response = productService.getLatestList(
                type, page, size, bareboneFilter, switchFilter, keycapFilter);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{product_type}/popular")
    public ResponseEntity<ProductListResponse> getPopularList(
            @PathVariable("product_type") ProductType productType,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @ModelAttribute BareboneListRequest bareboneFilter,
            @ModelAttribute SwitchListRequest switchFilter,
            @ModelAttribute KeycapListRequest keycapFilter
    ) {
        ProductListResponse response = productService.getPopularList(
                productType, page, size, bareboneFilter, switchFilter, keycapFilter);
        return ResponseEntity.ok(response);
    }
}
