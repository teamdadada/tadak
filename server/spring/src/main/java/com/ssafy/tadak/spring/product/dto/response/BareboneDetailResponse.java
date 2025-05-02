package com.ssafy.tadak.spring.product.dto.response;

import java.util.List;

import com.ssafy.tadak.spring.product.domain.entity.Barebone;

public record BareboneDetailResponse(
	String name,
	String manufacturer,
	String releaseDate,
	String size,
	String connectionType,
	String contactType,
	String keyLayout,
	String interfaceType,
	List<String> features,
	String minPrice,
	String thumbnail,
	String detailImage,
	String url
) implements ProductDetailResponse {
	public static BareboneDetailResponse from(Barebone d) {
		return new BareboneDetailResponse(
			d.getName(),
			d.getManufacturer(),
			d.getReleaseDate(),
			d.getSize(),
			d.getConnectionType(),
			d.getContactType(),
			d.getKeyLayout(),
			d.getInterfaceType(),
			d.getFeatures(),
			d.getMinPrice(),
			d.getThumbnail(),
			d.getDetailImage(),
			d.getUrl()
		);
	}
}

