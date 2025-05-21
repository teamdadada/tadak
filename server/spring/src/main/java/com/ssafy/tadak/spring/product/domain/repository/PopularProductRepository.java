package com.ssafy.tadak.spring.product.domain.repository;

import com.ssafy.tadak.spring.product.domain.entity.PopularProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PopularProductRepository extends JpaRepository<PopularProduct, Long> {

    List<PopularProduct> findAllByOrderByRankingAsc();

    @Query("SELECT p " +
            "FROM PopularProduct p " +
            "WHERE p.ranking > :cursorRanking " +
            "ORDER BY p.ranking ASC")
    List<PopularProduct> findByRankingAfterCursor(
            @Param("cursorRanking") Long cursorRanking,
            Pageable pageable
    );
}
