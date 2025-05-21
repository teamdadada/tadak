package com.ssafy.tadak.spring.review.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.tadak.spring.common.enums.SortType;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.review.domain.entity.Review;
import com.ssafy.tadak.spring.user.domain.entity.User;
import org.bson.Document;

import java.util.List;

public record ReviewDetailResponse(
        long reviewId,
        ProductSimpleDto product,
        String content,
        int score,
        List<String> images,
        AuthorMeta author
) {
    public static ReviewDetailResponse from(Review review, User user, Document productDoc) {

        if (productDoc == null) {
            return new ReviewDetailResponse(
                    review.getReviewId(),
                    null,
                    review.getContent(),
                    review.getScore(),
                    review.getImages(),
                    new AuthorMeta(user.getId(), user.getUserName(), user.getProfileImg())
            );
        } else {
            return new ReviewDetailResponse(
                    review.getReviewId(),
                    ProductSimpleDto.builder()
                            .productId(productDoc.getInteger("product_id").longValue())
                            .name(productDoc.getString("name"))
                            .hits(productDoc.getInteger("hit"))
                            .thumbnail(productDoc.getString("thumbnail"))
                            .minPrice(productDoc.getInteger("min_price"))
                            .type((ProductType) productDoc.get("type"))
                            .cursor(null)
                            .build(),
                    review.getContent(),
                    review.getScore(),
                    review.getImages(),
                    new AuthorMeta(user.getId(), user.getUserName(), user.getProfileImg()
                    ));
        }
    }

    public record AuthorMeta(
            long id,
            String name,
            String profileImg
    ) {}
}