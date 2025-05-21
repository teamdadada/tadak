package com.ssafy.tadak.spring.product.domain.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "barebone_specs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Barebone {

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

    @Field("release_date")
    private String releaseDate;

    @Field("size")
    private String size;

    @Field("connection_type")
    private String connectionType;

    @Field("contact_type")
    private String contactType;

    @Field("key_layout")
    private String keyLayout;

    @Field("interface")
    private String interfaceType;

    @Field("features")
    private List<String> features;

    @Field("thumbnail")
    private String thumbnail;

    @Field("detail_image")
    private String detailImage;

    @Field("min_price")
    private Integer minPrice;

    @Field("url")
    private String url;

    @Field("product_id")
    private Long productId;
}

