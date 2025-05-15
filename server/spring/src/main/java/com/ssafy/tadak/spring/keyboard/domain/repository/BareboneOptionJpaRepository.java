package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BareboneOptionJpaRepository extends JpaRepository<BareboneOption, Long> {
    List<BareboneOption> findAllByLayoutAndMaterial(Long layout, Long material);
}
