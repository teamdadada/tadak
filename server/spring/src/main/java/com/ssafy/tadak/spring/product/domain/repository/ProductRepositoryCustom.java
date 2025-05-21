package com.ssafy.tadak.spring.product.domain.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.model.*;
import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.entity.Switch;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.exception.errorCode.ProductErrorCode;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.common.enums.SortType;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import static com.ssafy.tadak.spring.product.exception.exception.ProductException.ProductBadRequestException;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;

    public void bulkUpdateHitsMySQL(Map<Long, Integer> productHits) {
        String sql = "UPDATE products SET hits = hits + ? WHERE product_id = ?";

        List<Map.Entry<Long, Integer>> entries = new ArrayList<>(productHits.entrySet());

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Map.Entry<Long, Integer> entry = entries.get(i);
                ps.setInt(1, entry.getValue());
                ps.setLong(2, entry.getKey());
            }

            @Override
            public int getBatchSize() {
                return entries.size();
            }
        });
    }

    public void bulkInsertPopularProducts(List<Map.Entry<Long, Integer>> sortedList) {
        String sql = "INSERT INTO popular_products (ranking, product_id) VALUES (?, ?)";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Map.Entry<Long, Integer> entry = sortedList.get(i);
                ps.setLong(1, i + 1L); // 랭킹 1부터 시작
                ps.setLong(2, entry.getKey()); // productId
            }

            @Override
            public int getBatchSize() {
                return sortedList.size();
            }
        });
    }

    public void resetPopularProductsTable() {
        jdbcTemplate.execute("TRUNCATE TABLE popular_products");
    }

    public void bulkUpdateHitsMongo(Map<Long, Integer> productHits) {
        updateCollection(productHits, "barebone_specs");
        updateCollection(productHits, "keycaps_specs");
        updateCollection(productHits, "switches_specs");
    }

    private void updateCollection(Map<Long, Integer> productHits, String collectionName) {
        List<WriteModel<Document>> bulkUpdates = new ArrayList<>();

        productHits.forEach((productId, hits) -> {
            // 1. 필터: product_id가 대상인 문서 찾기
            Bson filter = Filters.eq("product_id", productId);

            // 2. Update Pipeline
            List<Document> updatePipeline = List.of(
                    new Document("$set", new Document()
                            // hit 필드 증가
                            .append("hit",
                                    new Document("$add", List.of(
                                            new Document("$ifNull", List.of("$hit", 0)),
                                            hits
                                    ))
                            )
                            // popular_sort_key 생성
                            .append("popular_sort_key",
                                    new Document("$concat", List.of(
                                            // 8자리 Zero-padding(hit)
                                            new Document("$substrCP", List.of(
                                                    new Document("$concat", List.of(
                                                            "00000000",
                                                            new Document("$toString", new Document("$add", List.of(
                                                                    new Document("$ifNull", List.of("$hit", 0)),
                                                                    hits
                                                            )))
                                                    )),
                                                    new Document("$subtract", List.of(
                                                            new Document("$strLenCP", new Document("$concat", List.of(
                                                                    "00000000",
                                                                    new Document("$toString", new Document("$add", List.of(
                                                                            new Document("$ifNull", List.of("$hit", 0)),
                                                                            hits
                                                                    )))
                                                            ))),
                                                            8
                                                    )),
                                                    8
                                            )),
                                            "_",
                                            // 4자리 Zero-padding(product_id)
                                            new Document("$substrCP", List.of(
                                                    new Document("$concat", List.of(
                                                            "0000",
                                                            new Document("$toString", "$product_id")
                                                    )),
                                                    new Document("$subtract", List.of(
                                                            new Document("$strLenCP", new Document("$concat", List.of(
                                                                    "0000",
                                                                    new Document("$toString", "$product_id")
                                                            ))),
                                                            4
                                                    )),
                                                    4
                                            ))
                                    ))
                            )
                    )
            );

            // 3. 업데이트 모델 생성
            UpdateOneModel<Document> updateModel = new UpdateOneModel<>(
                    filter,
                    updatePipeline, // 주의: List<Document>를 직접 전달
                    new UpdateOptions().upsert(false) // 신규 문서 생성 방지
            );
            bulkUpdates.add(updateModel);
        });

        // 4. 벌크 업데이트 실행
        if (!bulkUpdates.isEmpty()) {
            mongoTemplate.getCollection(collectionName).bulkWrite(bulkUpdates);
        }
    }

    public List<Document> find(Query query, Class<Document> clazz, ProductType type) {
        return mongoTemplate.find(query, clazz, type.toString());
    }

    public List<Map<String, Object>> findFilteredProductsByCursor(
            ProductType type,
            Map<String, List<String>> filters,
            Integer minPriceMin,
            Integer minPriceMax,
            String cursor,
            int size,
            SortType sortType
    ) {
        String collection = getCollectionName(type);
        Query query = buildMongoQuery(filters, minPriceMin, minPriceMax, size);

        String sortKey = switch (sortType) {
            case LATEST -> "latest_sort_key";
            case POPULAR -> "popular_sort_key";
            default -> throw new ProductBadRequestException(ProductErrorCode.PRODUCT_BAD_SORTTYPE);
        };

        if (cursor != null && !cursor.isBlank()) {
            query.addCriteria(Criteria.where(sortKey).lt(cursor));
        }

        query.with(Sort.by(Sort.Direction.DESC, sortKey));
        List<Document> specs = mongoTemplate.find(query, Document.class, collection);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Object>> specMaps = specs.stream()
                .map(doc -> objectMapper.convertValue(doc, new TypeReference<Map<String, Object>>() {}))
                .toList();

        return specMaps;
    }

    public List<Map<String, Object>> findByIds(List<Long> ids) {
        List<Document> barebones = mongoTemplate.find(
                Query.query(Criteria.where("product_id").in(ids)), Document.class, "barebone_specs");
        List<Document> switches = mongoTemplate.find(
                Query.query(Criteria.where("product_id").in(ids)), Document.class, "switches_specs");
        List<Document> keycaps = mongoTemplate.find(
                Query.query(Criteria.where("product_id").in(ids)), Document.class, "keycaps_specs");
        barebones.forEach(doc -> doc.put("type", "BAREBONE"));
        switches.forEach(doc -> doc.put("type", "SWITCH"));
        keycaps.forEach(doc -> doc.put("type", "KEYCAP"));

        List<Document> specs = new ArrayList<>();
        specs.addAll(barebones);
        specs.addAll(switches);
        specs.addAll(keycaps);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Object>> specMaps = specs.stream()
                .map(doc -> objectMapper.convertValue(doc, new TypeReference<Map<String, Object>>() {}))
                .toList();

        return specMaps;
    }

    private String getCollectionName(ProductType type) {
        return switch (type) {
            case BAREBONE -> "barebone_specs";
            case SWITCH -> "switches_specs";
            case KEYCAP -> "keycaps_specs";
        };
    }

    private Query buildMongoQuery(Map<String, List<String>> filters, Integer minPriceMin, Integer minPriceMax, Integer size) {
        Query query = new Query();

        if (filters != null) {
            filters.forEach((key, values) -> {
                if (values == null || values.isEmpty()) return;
                if (values.size() == 1)
                    query.addCriteria(Criteria.where(key).is(values.get(0)));
                else
                    query.addCriteria(Criteria.where(key).in(values));
            });
        }

        if (minPriceMin != null || minPriceMax != null) {
            Criteria priceCriteria = Criteria.where("min_price");
            if (minPriceMin != null) priceCriteria = priceCriteria.gte(minPriceMin);
            if (minPriceMax != null) priceCriteria = priceCriteria.lte(minPriceMax);
            query.addCriteria(priceCriteria);
        }

        query.limit(size);

        return query;
    }
}