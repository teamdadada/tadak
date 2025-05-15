package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Category;
import com.ssafy.tadak.spring.keyboard.domain.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionJpaRepository extends JpaRepository<Option, Long> {
    List<Option> findAllByCategory(Category category);
}
