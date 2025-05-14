package com.ssafy.tadak.spring.review.domain;

import com.ssafy.tadak.spring.review.domain.entity.Review;
import com.ssafy.tadak.spring.review.dto.ReviewSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByProductIdAndAuthorId(Long productId, Long authorId);

    List<Review> findAllByProductId(long productId);

    List<Review> findAllByProductIdOrderByReviewIdDesc(long productId);

    List<Review> findAllByProductIdOrderByScoreDesc(long productId);

    @Query(value = "SELECT ROUND(AVG(score),1) AS average, " +
            "SUM(CASE WHEN score = 1 THEN 1 ELSE 0 END) AS count1, " +
            "SUM(CASE WHEN score = 2 THEN 1 ELSE 0 END) AS count2, " +
            "SUM(CASE WHEN score = 3 THEN 1 ELSE 0 END) AS count3, " +
            "SUM(CASE WHEN score = 4 THEN 1 ELSE 0 END) AS count4, " +
            "SUM(CASE WHEN score = 5 THEN 1 ELSE 0 END) AS count5 " +
            "FROM reviews WHERE product_id = :productId", nativeQuery = true)
    ReviewSummary getReviewSummary(@Param("productId") Long productId);

    boolean existsByProductId(long productId);
}
