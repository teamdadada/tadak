package com.ssafy.tadak.spring.minio.domain.repository;

import com.ssafy.tadak.spring.minio.domain.entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelJpaRepository extends JpaRepository<Model, Long> {
}
