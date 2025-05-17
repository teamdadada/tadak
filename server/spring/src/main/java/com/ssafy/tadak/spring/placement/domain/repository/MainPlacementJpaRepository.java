package com.ssafy.tadak.spring.placement.domain.repository;

import com.ssafy.tadak.spring.placement.domain.entity.MainPlacement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MainPlacementJpaRepository extends JpaRepository<MainPlacement, Long> {
    MainPlacement findByUserId(Long userId);
}
