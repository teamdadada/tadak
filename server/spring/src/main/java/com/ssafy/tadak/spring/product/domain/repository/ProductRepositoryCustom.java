package com.ssafy.tadak.spring.product.domain.repository;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.product.util.enums.SortType;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    public Page<Product> findFilteredProducts(
            ProductType type,
            Map<String, List<String>> filters,
            Integer minPriceMin,
            Integer minPriceMax,
            Pageable pageable,
            SortType sortType
    ) {
        String collection = getCollectionName(type);
        Query query = buildMongoQuery(filters, minPriceMin, minPriceMax);

        if (sortType == SortType.LATEST) {
            query.with(org.springframework.data.domain.Sort.by(
                    org.springframework.data.domain.Sort.Direction.DESC,
                    "release_year", "release_month"
            ));
        }

        query.with(pageable);

        List<Document> docs = mongoTemplate.find(query, Document.class, collection);
        long total = mongoTemplate.count(query.skip(0).limit(0), collection);
        List<Long> ids = getProductIds(docs);

        if (ids.isEmpty())
            return new PageImpl<>(List.of(), pageable, total);

        List<Product> products;
        if (sortType == SortType.POPULAR) {
            products = fetchProductsFromRdbSorted(ids, type, "hits", true, pageable);
        } else {
            products = fetchProductsPreserveOrder(ids, type);
            Map<Long, Product> map = products.stream()
                    .collect(Collectors.toMap(Product::getProductId, p -> p));
            products = ids.stream().map(map::get).filter(Objects::nonNull).toList();
        }

        return new PageImpl<>(products, pageable, total);
    }

    private String getCollectionName(ProductType type) {
        return switch (type) {
            case BAREBONE -> "barebone_specs";
            case SWITCH -> "switches_specs";
            case KEYCAP -> "keycaps_specs";
        };
    }

    private Query buildMongoQuery(Map<String, List<String>> filters, Integer minPriceMin, Integer minPriceMax) {
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

        return query;
    }

    private List<Long> getProductIds(List<Document> docs) {
        return docs.stream()
                .map(doc -> {
                    Number n = doc.get("product_id", Number.class);
                    return n != null ? n.longValue() : null;
                })
                .filter(Objects::nonNull)
                .toList();
    }

    private List<Product> fetchProductsPreserveOrder(List<Long> ids, ProductType type) {
        return entityManager.createQuery("""
                SELECT p FROM Product p
                WHERE p.productId IN :ids AND p.productType = :type
                """, Product.class)
                .setParameter("ids", ids)
                .setParameter("type", type)
                .getResultList();
    }

    private List<Product> fetchProductsFromRdbSorted(
            List<Long> ids,
            ProductType type,
            String sortField,
            boolean descending,
            Pageable pageable
    ) {
        String jpql = "SELECT p FROM Product p " +
                "WHERE p.productId IN :ids AND p.productType = :type " +
                "ORDER BY p." + sortField + (descending ? " DESC" : " ASC");

        return entityManager.createQuery(jpql, Product.class)
                .setParameter("ids", ids)
                .setParameter("type", type)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
    }
}