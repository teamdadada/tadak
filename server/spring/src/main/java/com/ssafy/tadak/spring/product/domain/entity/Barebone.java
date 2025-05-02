package com.ssafy.tadak.spring.product.domain.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "barebone_specs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Barebone {

	@Id
	private String id;

	private String name;

	private String manufacturer;

	@Field("release_date")
	private String releaseDate;

	private String size;

	@Field("connection_type")
	private String connectionType;

	@Field("contact_type")
	private String contactType;

	@Field("key_layout")
	private String keyLayout;

	@Field("interface")
	private String interfaceType;

	private List<String> features;

	private String thumbnail;

	@Field("detail_image")
	private String detailImage;

	@Field("min_price")
	private String minPrice;

	private String url;

	@Field("product_id")
	private Long productId;
}

