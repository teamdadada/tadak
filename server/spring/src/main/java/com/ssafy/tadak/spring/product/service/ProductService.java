package com.ssafy.tadak.spring.product.service;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepository;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepositoryCustom;
import com.ssafy.tadak.spring.product.dto.request.ProductsCursorRequest;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.dto.request.ProductDetailRequest;
import com.ssafy.tadak.spring.product.dto.request.list.BareboneListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.KeycapListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.ProductListRequest;
import com.ssafy.tadak.spring.product.dto.request.list.SwitchListRequest;
import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.filter.ProductFilterResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductListResponse;
import com.ssafy.tadak.spring.product.exception.exception.ProductNotFoundException;
import com.ssafy.tadak.spring.product.util.FieldNameMapper;
import com.ssafy.tadak.spring.product.util.ProductUtil;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.common.enums.SortType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductRepositoryCustom productRepositoryCustom;
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

    @Transactional(readOnly = true)
    public ProductListResponse getProductList(
            ProductType type,
            String cursor,
            int size,
            SortType sort,
            BareboneListRequest bareboneFilter,
            SwitchListRequest switchFilter,
            KeycapListRequest keycapFilter
    ) {
        ProductListRequest filterRequest = switch (type) {
            case BAREBONE -> bareboneFilter;
            case SWITCH -> switchFilter;
            case KEYCAP -> keycapFilter;
        };
        ProductsCursorRequest cursorRequest = new ProductsCursorRequest(cursor, size, sort);

        Map<String, List<String>> filters = FieldNameMapper.convertKeysToSnakeCase(filterRequest.toMap());

        List<Map<String, Object>> results = productRepositoryCustom.findFilteredProductsByCursor(
                type,
                filters,
                filterRequest.minPriceMin(),
                filterRequest.minPriceMax(),
                cursorRequest.cursor(),
                cursorRequest.size(),
                cursorRequest.sort()
        );

        List<ProductSimpleDto> dtoList = results.stream()
                .map(spec -> ProductSimpleDto.from(spec, type, cursorRequest.sort()))
                .toList();

        return ProductListResponse.of(dtoList, cursorRequest.size());
    }
}
