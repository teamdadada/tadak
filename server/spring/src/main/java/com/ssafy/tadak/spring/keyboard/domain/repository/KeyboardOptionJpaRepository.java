package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyboardOptionJpaRepository extends JpaRepository<KeyboardOption, Long> {
}
