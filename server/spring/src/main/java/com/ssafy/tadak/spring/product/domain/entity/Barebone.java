package com.ssafy.tadak.spring.product.domain.entity;

import java.util.List;

import lombok.Builder;
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

	@Builder
	public Barebone(String id, String name, String manufacturer, String releaseDate, String size, String connectionType, String contactType, String keyLayout, String interfaceType, List<String> features, String thumbnail, String detailImage, String minPrice, String url, Long productId) {
		this.id = id;
		this.name = name;
		this.manufacturer = manufacturer;
		this.releaseDate = releaseDate;
		this.size = size;
		this.connectionType = connectionType;
		this.contactType = contactType;
		this.keyLayout = keyLayout;
		this.interfaceType = interfaceType;
		this.features = features;
		this.thumbnail = thumbnail;
		this.detailImage = detailImage;
		this.minPrice = minPrice;
		this.url = url;
		this.productId = productId;
	}
}

