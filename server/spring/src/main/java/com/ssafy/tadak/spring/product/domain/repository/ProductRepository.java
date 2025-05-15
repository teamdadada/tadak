package com.ssafy.tadak.spring.product.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductIdAndProductType(Long productId, ProductType productType);

    List<Product> findAllByProductType(ProductType productType);

    @Query("""
    SELECT p FROM Product p
    WHERE (:query IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :query, '%')))
      AND (
        :hitsCursor IS NULL OR
        (p.hits < :hitsCursor) OR
        (p.hits = :hitsCursor AND p.productId < :idCursor)
      )
    ORDER BY p.hits DESC, p.productId DESC
    Limit :size
    """)
    List<Product> searchByNameWithCursor(
            @Param("query") String query,
            @Param("hitsCursor") Integer hitsCursor,
            @Param("idCursor") Integer idCursor,
            @Param("size") Integer size
    );
}
