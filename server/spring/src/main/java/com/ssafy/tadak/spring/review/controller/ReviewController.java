package com.ssafy.tadak.spring.review.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.common.enums.SortType;
import com.ssafy.tadak.spring.review.dto.request.PostReviewRequest;
import com.ssafy.tadak.spring.review.dto.response.PostReviewResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewDetailResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewListResponse;
import com.ssafy.tadak.spring.review.dto.response.ReviewScoreReponse;
import com.ssafy.tadak.spring.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{review_id}")
    public ResponseEntity<ReviewDetailResponse> getReviewById(
            @PathVariable("review_id") Long reviewId
    ) {
        return ResponseEntity.ok(reviewService.getReviewById(reviewId));
    }

    @GetMapping("/list/me")
    public ResponseEntity<ReviewListResponse> getMyReviews(
            @AuthUser UserInfo userInfo
    ) {
        return ResponseEntity.ok(reviewService.getMyReviews(userInfo));
    }

    @GetMapping("/score/{product_id}")
    public ResponseEntity<ReviewScoreReponse> getReviewScoreById(
            @PathVariable("product_id") Long productId
    ) {
        return ResponseEntity.ok(reviewService.getReviewScoreSummary(productId));
    }


    @GetMapping("/list/{product_id}")
    public ResponseEntity<ReviewListResponse> getReviewsByProductId(
            @PathVariable("product_id") Long productId,
            @RequestParam(name = "cursor", required = false) String cursor,
            @RequestParam(name = "size",  defaultValue = "10") int size,
            @RequestParam(name = "sort",  defaultValue = "LATEST") SortType sort
    ) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId, sort));
    }

    @DeleteMapping("/{review_id}")
    public ResponseEntity<Void> deleteReviewById(
            @PathVariable("review_id") Long reviewId,
            @AuthUser UserInfo userInfo
    ) {
        reviewService.deleteReviewById(reviewId, userInfo);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{product_id}")
    public ResponseEntity<PostReviewResponse> postReviewByProductId(
            @PathVariable("product_id") Long productId,
            @RequestBody PostReviewRequest postReviewRequest,
            @AuthUser UserInfo userInfo
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reviewService.postReviewByProductId(
                    productId,
                    postReviewRequest,
                    userInfo
                ));
    }
}
