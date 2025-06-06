package com.ssafy.tadak.spring.minio.domain.repository;

import com.ssafy.tadak.spring.minio.domain.entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BucketJpaRepository extends JpaRepository<Bucket, Long> {
    Optional<Bucket> findByName(String name);
}
