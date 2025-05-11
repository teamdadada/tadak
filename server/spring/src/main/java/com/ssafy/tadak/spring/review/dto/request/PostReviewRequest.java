package com.ssafy.tadak.spring.review.dto.request;

import java.util.List;

public record PostReviewRequest(
        String reviewContent,
        Integer reviewScore,
        List<String> imageList
) {
}
