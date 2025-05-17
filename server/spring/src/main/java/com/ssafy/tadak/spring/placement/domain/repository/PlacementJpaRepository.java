package com.ssafy.tadak.spring.placement.domain.repository;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.placement.domain.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlacementJpaRepository extends JpaRepository<Placement, Long> {
    List<Placement> findAllByUserId(Long userId);;

    List<Placement> findAllByUserIdAndCanDeleteOrderById(Long userId, Boolean canDelete);

    Placement findByUserIdAndImage(Long userId, Image image);
}
