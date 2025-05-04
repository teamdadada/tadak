package com.ssafy.tadak.spring.product.domain.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "switches_specs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Switch {

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("release_year")
    private Integer releaseYear;

    @Field("release_month")
    private Integer releaseMonth;

    @Field("manufacturer")
    private String manufacturer;

    @Field("quantity")
    private String quantity;

    @Field("switch_type")
    private String switchType;

    @Field("key_force")
    private String keyForce;

    @Field("min_price")
    private Integer minPrice;

    @Field("thumbnail")
    private String thumbnail;

    @Field("detail_image")
    private String detailImage;

    @Field("url")
    private String url;

    @Field("product_id")
    private Long productId;
}
