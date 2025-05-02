package com.ssafy.tadak.spring.product.dto.response;

import com.ssafy.tadak.spring.product.domain.entity.Keycap;

public record KeycapDetailResponse(
	String name,
	String keycapMaterial,
	String engravingPosition,
	String keyCount,
	String minPrice,
	String thumbnail,
	String detailImage,
	String url
) implements ProductDetailResponse {
	public static KeycapDetailResponse from(Keycap d) {
		return new KeycapDetailResponse(
			d.getName(),
			d.getKeycapMaterial(),
			d.getEngravingPosition(),
			d.getKeyCount(),
			d.getMinPrice(),
			d.getThumbnail(),
			d.getDetailImage(),
			d.getUrl()
		);
	}
}

