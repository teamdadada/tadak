package com.ssafy.tadak.spring.review.repository;

import com.ssafy.tadak.spring.review.repository.entity.Review;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByProductIdAndAuthorId(Long productId, Long authorId);
}
