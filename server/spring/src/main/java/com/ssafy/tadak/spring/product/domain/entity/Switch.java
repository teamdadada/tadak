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

@Document(collection = "keycaps_specs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Switch {

	@Id
	private String id;

	private String name;

	private String manufacturer;

	@Field("registered_date")
	private String registeredDate;

	private String quantity;

	@Field("switch_type")
	private String switchType;

	@Field("key_force")
	private String keyForce;

	@Field("min_price")
	private String minPrice;

	private String thumbnail;

	@Field("detail_image")
	private String detailImage;

	private String url;

	@Field("product_id")
	private Long productId;
}
