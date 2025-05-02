package com.ssafy.tadak.spring.product.dto.response;

import com.ssafy.tadak.spring.product.domain.entity.Switch;

public record SwitchDetailResponse(
	String name,
	String manufacturer,
	String registeredDate,
	String quantity,
	String switchType,
	String keyForce,
	String minPrice,
	String thumbnail,
	String detailImage,
	String url
) implements ProductDetailResponse {
	public static SwitchDetailResponse from(Switch d) {
		return new SwitchDetailResponse(
			d.getName(),
			d.getManufacturer(),
			d.getRegisteredDate(),
			d.getQuantity(),
			d.getSwitchType(),
			d.getKeyForce(),
			d.getMinPrice(),
			d.getThumbnail(),
			d.getDetailImage(),
			d.getUrl()
		);
	}
}


