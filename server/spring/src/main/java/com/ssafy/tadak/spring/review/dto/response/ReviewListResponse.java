package com.ssafy.tadak.spring.review.dto.response;

import java.util.List;

public record ReviewListResponse(
        int count,
        List<ReviewDetailResponse> reviews
) {
    public static ReviewListResponse from(List<ReviewDetailResponse> reviews) {
        return new ReviewListResponse(reviews.size(), reviews);
    }
}
