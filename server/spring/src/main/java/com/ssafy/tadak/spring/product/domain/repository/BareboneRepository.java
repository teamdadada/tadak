package com.ssafy.tadak.spring.product.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.tadak.spring.product.domain.entity.Barebone;

public interface BareboneRepository extends MongoRepository<Barebone, String> {

    Optional<Barebone> findByProductId(Long productId);

    List<Barebone> findByProductIdIn(List<Long> productIds);
}
