package com.ssafy.tadak.spring.product.domain.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.tadak.spring.product.domain.entity.Keycap;

public interface KeycapRepository extends MongoRepository<Keycap, String> {

    Optional<Keycap> findByProductId(Long productId);
}
