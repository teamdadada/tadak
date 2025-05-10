package com.ssafy.tadak.spring.review.dto.response;

import com.ssafy.tadak.spring.review.domain.entity.Review;
import com.ssafy.tadak.spring.user.domain.entity.User;

import java.util.List;

public record ReviewDetailResponse(
        long productId,
        String content,
        int score,
        List<String> images,
        AuthorMeta author
) {
    public static ReviewDetailResponse from(Review review, User user) {
        return new ReviewDetailResponse(
                review.getProductId(),
                review.getContent(),
                review.getScore(),
                review.getImages(),
                new AuthorMeta(user.getId(), user.getUserName(), user.getProfileImg())
        );
    }

    public record AuthorMeta(
            long id,
            String name,
            String profileImg
    ) {}
}