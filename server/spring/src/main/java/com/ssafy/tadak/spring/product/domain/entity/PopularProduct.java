package com.ssafy.tadak.spring.product.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "popular_products")
@ToString
public class PopularProduct {

    @Id
    private Long ranking;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private Product product;
}
