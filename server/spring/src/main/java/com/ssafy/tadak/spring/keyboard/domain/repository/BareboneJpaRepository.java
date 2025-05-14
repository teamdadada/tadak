package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BareboneJpaRepository extends JpaRepository<BareboneOption, Long> {
}
