package com.ssafy.tadak.spring.placement.domain.repository;

import com.ssafy.tadak.spring.placement.domain.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementJpaRepository extends JpaRepository<Placement, Long> {
}
