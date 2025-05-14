package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryJpaRepository extends JpaRepository<Category, Long> {
}
