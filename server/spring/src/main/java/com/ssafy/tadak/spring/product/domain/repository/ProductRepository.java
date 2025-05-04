package com.ssafy.tadak.spring.product.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductIdAndProductType(Long productId, ProductType productType);

    List<Product> findAllByProductType(ProductType productType);
}
