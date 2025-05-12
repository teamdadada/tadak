package com.ssafy.tadak.spring.review.domain;

import com.ssafy.tadak.spring.review.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByProductIdAndAuthorId(Long productId, Long authorId);

    List<Review> findAllByProductId(long productId);

    List<Review> findAllByProductIdOrderByReviewIdDesc(long productId);

    List<Review> findAllByProductIdOrderByScoreDesc(long productId);
}
