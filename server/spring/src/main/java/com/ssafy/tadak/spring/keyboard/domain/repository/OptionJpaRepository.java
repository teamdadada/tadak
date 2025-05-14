package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionJpaRepository extends JpaRepository<Option, Long> {
}
