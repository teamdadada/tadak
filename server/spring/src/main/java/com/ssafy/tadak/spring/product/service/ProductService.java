package com.ssafy.tadak.spring.product.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.tadak.spring.common.annotation.RedisLog;
import com.ssafy.tadak.spring.product.domain.entity.PopularProduct;
import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.repository.PopularProductRepository;
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
import org.bson.Document;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductRepositoryCustom productRepositoryCustom;
    private final ProductUtil productUtil;
    private final StringRedisTemplate redisTemplate;
    private final PopularProductRepository popularProductRepository;

    /**
     * 제품 상세정보를 조회합니다.
     * @param productType 제품 타입
     * @param productId 제품 번호
     * @return 제품 상세 정보
     */
    @RedisLog
    public ProductDetailResponse getProductDetail(ProductType productType, Long productId) {
        ProductDetailRequest request = new ProductDetailRequest(productType, productId);
        Product product = productRepository.findByProductIdAndProductType(
                request.productId(), request.productType()
        ).orElseThrow(() -> new ProductNotFoundException(request.productId()));

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
    public ProductListResponse getPopularProductList(
            Long cursor,
            int size
    ) {
        Pageable pageable = PageRequest.of(0, size);
        List<PopularProduct> ppl = popularProductRepository.findByRankingAfterCursor(cursor, pageable);

        Map<ProductType, List<Long>> productIds = new HashMap<>();
        ppl.forEach(p ->
                productIds
                        .computeIfAbsent(p.getProduct().getProductType(), k -> new ArrayList<>())
                        .add(p.getProduct().getProductId())
        );
        Map<Long, Document> documents = new HashMap<>();

        productIds.forEach((productType, ids) -> {
            Query query = new Query(Criteria.where("product_id").in(ids));
            List<Document> docs = productRepositoryCustom.find(query, Document.class, productType);
            docs.forEach(doc -> documents.put(doc.getInteger("product_id").longValue(), doc));
        });

        List<ProductSimpleDto> result = new ArrayList<>();
        ppl.forEach(
                p -> {
                    ProductType type = p.getProduct().getProductType();
                    Long productId = p.getProduct().getProductId();
                    Document doc = documents.get(productId);
                    result.add(
                            ProductSimpleDto.builder()
                                    .productId(productId)
                                    .name(p.getProduct().getProductName())
                                    .minPrice(doc.getInteger("min_price"))
                                    .hits(doc.getInteger("hit"))
                                    .thumbnail(doc.getString("thumbnail"))
                                    .type(type)
                                    .cursor(String.format("%d", p.getRanking()))
                                    .build()
                    );
                }
        );

        return ProductListResponse.of(result, size);
    }

    @Transactional(readOnly = true)
    public ProductListResponse getProductListByQuery(
            String keyword,
            String cursor,
            int size
    ) {
        int[] cursorInfo = separateCursor(cursor);
        int hitC = cursorInfo[0];
        int idC = cursorInfo[1];
        List<Product> products = productRepository.searchByNameWithCursor(keyword, hitC, idC, size);

        Map<ProductType, List<Long>> productIds = new HashMap<>();
        products.forEach(p ->
                productIds
                        .computeIfAbsent(p.getProductType(), k -> new ArrayList<>())
                        .add(p.getProductId())
        );
        Map<Long, Document> documents = new HashMap<>();

        productIds.forEach((productType, ids) -> {
            Query query = new Query(Criteria.where("product_id").in(ids));
            List<Document> docs = productRepositoryCustom.find(query, Document.class, productType);
            docs.forEach(doc -> documents.put(doc.getInteger("product_id").longValue(), doc));
        });

        List<ProductSimpleDto> result = new ArrayList<>();
        products.forEach(
                p -> {
                    ProductType type = p.getProductType();
                    Long productId = p.getProductId();
                    Document doc = documents.get(productId);
                    result.add(
                                ProductSimpleDto.builder()
                                .productId(productId)
                                .name(p.getProductName())
                                .minPrice(doc.getInteger("min_price"))
                                .hits(doc.getInteger("hit"))
                                .thumbnail(doc.getString("thumbnail"))
                                .type(type)
                                .cursor(String.format("%d_%d", doc.getInteger("hit"), productId))
                                .build()
                    );
                }
            );

        return ProductListResponse.of(result, size);
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

    @Scheduled(fixedDelay = 1000 * 30)
    @Transactional
    public void syncProductHits() {
        Set<String> keys = redisTemplate.keys("product:hits:*");
        Map<Long, Integer> productHits = new HashMap<>();
        keys.forEach(key -> {
            String[] split = key.split(":");
            Long productId = Long.parseLong(split[2]);
            Integer hits = Integer.parseInt(redisTemplate.opsForValue().get(key));
            productHits.put(productId, hits);
        });

        productRepositoryCustom.bulkUpdateHitsMySQL(productHits);
        productRepositoryCustom.bulkUpdateHitsMongo(productHits);

        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @Scheduled(fixedDelay = 1000 * 60 * 30)
    @Transactional
    public void calcPopularProducts() {
        Set<String> keys = redisTemplate.keys("product_view:logs:*");
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        Map<Long, Integer> productHits = new HashMap<>();
        keys.forEach(key -> {
            List<String> logs = redisTemplate.opsForList().range(key, 0, -1);

            if (logs.isEmpty()) {
                return;
            }

            logs.forEach(log -> {
                long productId = Long.parseLong(log);
                if (productHits.containsKey(productId)) {
                    productHits.put(productId, productHits.get(productId) + 1);
                } else {
                    productHits.put(productId, 1);
                }
            });
        });

        List<Map.Entry<Long, Integer>> sortedList = productHits.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))   // 조회수 내림차순
                .limit(30)
                .collect(Collectors.toList());

        productRepositoryCustom.resetPopularProductsTable();
        productRepositoryCustom.bulkInsertPopularProducts(sortedList);

        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    private int[] separateCursor(String cursor) {
        String[] split = cursor.split("_");
        return new int[]{Integer.parseInt(split[0]), Integer.parseInt(split[1])};
    }
}
