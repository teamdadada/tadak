package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.PartType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartTypeJpaRepository extends JpaRepository<PartType, Long> {
}
