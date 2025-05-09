package com.ssafy.tadak.spring.review.dto.response;

import com.ssafy.tadak.spring.review.repository.entity.Review;

import java.util.List;

public record ReviewDetailResponse(
        long productId,
        String content,
        int score,
        List<String> images,
        long authorId
) {
    public static ReviewDetailResponse from(Review review) {
        return new ReviewDetailResponse(
                review.getProductId(),
                review.getContent(),
                review.getScore(),
                review.getImages(),
                review.getAuthorId()
        );
    }
}
