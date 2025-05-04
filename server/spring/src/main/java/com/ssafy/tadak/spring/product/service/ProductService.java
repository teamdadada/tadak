package com.ssafy.tadak.spring.product.service;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepository;
import com.ssafy.tadak.spring.product.dto.request.ProductDetailRequest;
import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.filter.ProductFilterResponse;
import com.ssafy.tadak.spring.product.exception.exception.ProductNotFoundException;
import com.ssafy.tadak.spring.product.util.ProductUtil;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductUtil productUtil;

    /**
     * 제품 상세정보를 조회합니다.
     * @param productType 제품 타입
     * @param productId 제품 번호
     * @return 제품 상세 정보
     */
    public ProductDetailResponse getProductDetail(ProductType productType, Long productId) {
        ProductDetailRequest request = new ProductDetailRequest(productType, productId);
        Product product = productRepository.findByProductIdAndProductType(
                request.productId(), request.productType()
        ).orElseThrow(() -> new ProductNotFoundException(request.productId()));

        product.increaseHits();

        // 제품 타입에 따라 MongoDB에서 해당 상세 정보를 조회
        return productUtil.getDetailByType(product);
    }

    /**
     * 현재 가지고 있는 제품의 타입별 필터 리스트를 가져옵니다.
     * @param productType : 제품 타입
     * @return 제품의 타입별 필터 리스트
     */
    @Transactional(readOnly = true)
    public ProductFilterResponse getProductFilter(ProductType productType) {
        List<Product> products = productRepository.findAllByProductType(productType);
        return productUtil.getFilterByType(productType, products);
    }
}
