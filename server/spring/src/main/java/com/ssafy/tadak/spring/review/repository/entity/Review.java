package com.ssafy.tadak.spring.review.repository.entity;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.review.dto.request.PostReviewRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "score", nullable = false)
    private Integer score;

    @ElementCollection
    @CollectionTable(name = "review_images", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "images", nullable = false)
    private List<String> images = new ArrayList<>();

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    public Review(
            long productId,
            String content,
            int score,
            List<String> images,
            long authorId
    ) {
        this.productId = productId;
        this.content = content;
        this.score = score;
        this.images = images;
        this.authorId = authorId;
    }

    public static Review of(
            long productId,
            PostReviewRequest postReviewRequest,
            UserInfo author
    ) {
        return new Review(
                productId,
                postReviewRequest.reviewContent(),
                postReviewRequest.reviewScore(),
                postReviewRequest.imageList(),
                author.id()
        );
    }
}
