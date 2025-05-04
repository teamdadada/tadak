package com.ssafy.tadak.spring.product.domain.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.tadak.spring.product.domain.entity.Switch;

public interface SwitchRepository extends MongoRepository<Switch, String> {

    Optional<Switch> findByProductId(Long productId);
}
