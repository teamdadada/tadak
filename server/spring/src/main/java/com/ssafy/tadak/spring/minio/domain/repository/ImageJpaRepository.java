package com.ssafy.tadak.spring.minio.domain.repository;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageJpaRepository extends JpaRepository<Image, Long> {
}
