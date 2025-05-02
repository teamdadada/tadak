package com.ssafy.tadak.spring.product.domain.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "keycaps")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Keycap {

	@Id
	private String id;

	private String name;

	@Field("keycap_material")
	private String keycapMaterial;

	@Field("engraving_position")
	private String engravingPosition;

	@Field("key_count")
	private String keyCount;

	@Field("min_price")
	private String minPrice;

	private String thumbnail;

	@Field("detail_image")
	private String detailImage;

	private String url;

	@Field("product_id")
	private Long productId;
}
