package com.ssafy.tadak.spring.product.domain.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.entity.Switch;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.product.util.enums.SortType;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final EntityManager entityManager;

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