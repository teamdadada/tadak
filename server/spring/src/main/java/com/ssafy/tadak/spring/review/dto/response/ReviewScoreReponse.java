package com.ssafy.tadak.spring.review.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.tadak.spring.review.dto.ReviewSummary;

public record ReviewScoreReponse(
    boolean isExist,
    long productId,
    double totalScore,
    ReviewScoreCount scoreCounts
) {
    public static ReviewScoreReponse of(ReviewSummary rs, long productId) {
        return new ReviewScoreReponse(
                true,
                productId,
                rs.getAverage(),
                new ReviewScoreCount(
                        rs.getCount1(),
                        rs.getCount2(),
                        rs.getCount3(),
                        rs.getCount4(),
                        rs.getCount5()
                )
        );
    }

    public record ReviewScoreCount(
            @JsonProperty("1") int one,
            @JsonProperty("2") int two,
            @JsonProperty("3") int three,
            @JsonProperty("4") int four,
            @JsonProperty("5") int five
    ) {
    }
}
