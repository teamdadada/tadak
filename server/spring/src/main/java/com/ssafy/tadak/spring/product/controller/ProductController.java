package com.ssafy.tadak.spring.product.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.common.enums.SortType;
import com.ssafy.tadak.spring.product.domain.entity.PopularProduct;
import com.ssafy.tadak.spring.product.dto.request.ProductsCursorRequest;
import com.ssafy.tadak.spring.product.dto.request.list.BareboneListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.KeycapListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.SwitchListRequest;
import com.ssafy.tadak.spring.product.dto.response.filter.ProductFilterResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductListResponse;
import com.ssafy.tadak.spring.product.service.ProductService;
import lombok.Getter;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
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

    @GetMapping("/top/list")
    public ResponseEntity<ProductListResponse> getTopProductList(
            @RequestParam(name = "cursor", defaultValue = "0") Long cursor,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(productService.getPopularProductList(
                cursor,
                size
        ));
    }

    @GetMapping(value = "/list", params = "!query")
    public ResponseEntity<ProductListResponse> getProductList(
            @RequestParam(name = "query", required = false) String keyword,
            @RequestParam(name = "type") ProductType type,
            @RequestParam(name = "cursor", required = false) String cursor,
            @RequestParam(name = "size",  defaultValue = "10") int size,
            @RequestParam(name = "sort",  defaultValue = "LATEST") SortType sort,
            @ModelAttribute BareboneListRequest bareboneFilter,
            @ModelAttribute SwitchListRequest switchFilter,
            @ModelAttribute KeycapListRequest keycapFilter
    ) {
        return ResponseEntity.ok(productService.getProductList(
                type,
                cursor,
                size,
                sort,
                bareboneFilter,
                switchFilter,
                keycapFilter
        ));
    }

    @GetMapping(value = "/list", params = "query")
    public ResponseEntity<ProductListResponse> getProductList(
            @RequestParam(name = "query", required = false) String keyword,
            @RequestParam(name = "cursor", defaultValue = "2147483647_2147483647") String cursor,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(productService.getProductListByQuery(
                keyword,
                cursor,
                size
        ));
    }
}
