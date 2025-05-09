package com.ssafy.tadak.spring.review.service;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.review.dto.request.PostReviewRequest;
import com.ssafy.tadak.spring.review.dto.response.PostReviewResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewDetailResponse;
import com.ssafy.tadak.spring.review.exception.ReviewErrorCode;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewNotFoundException;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewConflictException;
import com.ssafy.tadak.spring.review.repository.ReviewRepository;
import com.ssafy.tadak.spring.review.repository.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewDetailResponse getReviewById(long reviewId) {
        return ReviewDetailResponse.from(findById(reviewId));
    }

    @Transactional
    public PostReviewResponse postReviewByProductId(
            long productId,
            PostReviewRequest postReviewRequest,
            UserInfo authorInfo
    ) {
        checkReviewExistByProductIdAndUserId(productId, authorInfo.id());
        Review newReview = Review.of(
                productId,
                postReviewRequest,
                authorInfo
        );
        reviewRepository.save(newReview);
        return new PostReviewResponse(newReview.getReviewId());
    }

    private Review findById(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException(ReviewErrorCode.REVIEW_NOT_FOUND));
    }

    private Review findByProductIdAndUserId(Long productId, long userId) {
        return reviewRepository.findByProductIdAndAuthorId(productId, userId)
                .orElseThrow(() -> new ReviewNotFoundException(ReviewErrorCode.REVIEW_NOT_FOUND));
    }

    private void checkReviewExistByProductIdAndUserId(Long productId, long userId) {
        reviewRepository.findByProductIdAndAuthorId(productId, userId)
                .ifPresent(r -> {
                    throw new ReviewConflictException(ReviewErrorCode.REVIEW_IS_ALREADY_EXIST);
                });
    }
}
