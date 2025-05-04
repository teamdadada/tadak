package com.ssafy.tadak.spring.product.domain.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "keycaps_specs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

	@Builder
	public Switch(String id, String name, String manufacturer, String registeredDate, String quantity, String switchType, String keyForce, String minPrice, String thumbnail, String detailImage, String url, Long productId) {
		this.id = id;
		this.name = name;
		this.manufacturer = manufacturer;
		this.registeredDate = registeredDate;
		this.quantity = quantity;
		this.switchType = switchType;
		this.keyForce = keyForce;
		this.minPrice = minPrice;
		this.thumbnail = thumbnail;
		this.detailImage = detailImage;
		this.url = url;
		this.productId = productId;
	}
}
