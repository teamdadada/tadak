package com.ssafy.tadak.spring.review.service;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.enums.SortType;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepositoryCustom;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.review.dto.ReviewSummary;
import com.ssafy.tadak.spring.review.dto.request.PostReviewRequest;
import com.ssafy.tadak.spring.review.dto.response.PostReviewResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewDetailResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewListResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewScoreReponse;
import com.ssafy.tadak.spring.review.exception.ReviewErrorCode;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewBadRequestException;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewNotFoundException;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewConflictException;
import static com.ssafy.tadak.spring.review.exception.ReviewException.ReviewForbiddenException;
import com.ssafy.tadak.spring.review.domain.ReviewRepository;
import com.ssafy.tadak.spring.review.domain.entity.Review;
import com.ssafy.tadak.spring.user.domain.UserRepository;
import com.ssafy.tadak.spring.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepositoryCustom productRepositoryCustom;

    @Transactional(readOnly = true)
    public ReviewDetailResponse getReviewById(long reviewId) {
        Review r = findById(reviewId);
        User u = userRepository.findById(r.getAuthorId())
                .orElse(null);
        return mapReviewAndUserInfo(r, u);
    }

    @Transactional
    public ReviewListResponse getMyReviews(UserInfo userInfo) {
        List<Review> reviews = reviewRepository.findByAuthorIdOrderByReviewIdDesc(userInfo.id().longValue());

        List<Long> productIds = reviews.stream()
                        .map(Review::getProductId).toList();

        Query query = new Query(Criteria.where("product_id").in(productIds));

        Map<Long, Document> specs = new HashMap<>();
        List<Document> docs = productRepositoryCustom.find(query, Document.class, ProductType.BAREBONE);
        docs.forEach(doc -> {
            doc.put("type", ProductType.BAREBONE);
            specs.put(doc.getInteger("product_id").longValue(), doc);
        });
        docs = productRepositoryCustom.find(query, Document.class, ProductType.KEYCAP);
        docs.forEach(doc -> {
            doc.put("type", ProductType.KEYCAP);
            specs.put(doc.getInteger("product_id").longValue(), doc);
        });
        docs = productRepositoryCustom.find(query, Document.class, ProductType.SWITCH);
        docs.forEach(doc -> {
            doc.put("type", ProductType.SWITCH);
            specs.put(doc.getInteger("product_id").longValue(), doc);
        });

        List<ReviewDetailResponse> reviewsResponseList = reviews.stream()
                .map(review -> ReviewDetailResponse.from(
                        review,
                        userRepository.findById(review.getAuthorId())
                                .orElse(null
                                ),
                        specs.get(review.getProductId())
                ))
                .toList();

        return ReviewListResponse.from(
                reviewsResponseList
        );
    }

    @Transactional(readOnly = true)
    public ReviewScoreReponse getReviewScoreSummary(long productId) {
        if(!reviewRepository.existsByProductId(productId))
            return new ReviewScoreReponse(
                    false,
                    productId,
                    0.0,
                    new ReviewScoreReponse.ReviewScoreCount(
                            0,
                            0,
                            0,
                            0,
                            0
                    )
            );
        ReviewSummary rs = reviewRepository.getReviewSummary(productId);
        return ReviewScoreReponse.of(rs, productId);
    }

    @Transactional(readOnly = true)
    public ReviewListResponse getReviewsByProductId(long productId, SortType sortType) {
        List<Review> reviews = switch (sortType) {
            case LATEST -> reviewRepository.findAllByProductIdOrderByReviewIdDesc(productId);
            case SCORE -> reviewRepository.findAllByProductIdOrderByScoreDesc(productId);
            default -> throw new ReviewBadRequestException(ReviewErrorCode.REVIEW_BAD_SORTTYPE);
        };

        List<ReviewDetailResponse> reviewsResponseList = reviews.stream()
                .map(review -> ReviewDetailResponse.from(
                        review,
                        userRepository.findById(review.getAuthorId())
                                .orElse(null
                        ),
                        null
                ))
                .toList();
        return ReviewListResponse.from(
                reviewsResponseList
        );
    }

    @Transactional
    public void deleteReviewById(long reviewId, UserInfo userInfo) {
        Review review = findById(reviewId);
        if (review.getAuthorId() != userInfo.id().longValue())
            throw new ReviewForbiddenException(ReviewErrorCode.REVIEW_IS_NOT_MINE);
        reviewRepository.delete(review);
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

    private ReviewDetailResponse mapReviewAndUserInfo(Review review, User user) {
        return ReviewDetailResponse.from(review, user, null);
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
