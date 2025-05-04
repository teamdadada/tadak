package com.ssafy.tadak.spring.product.dto.response;

import java.util.List;
import java.util.Optional;

import com.ssafy.tadak.spring.product.domain.entity.Barebone;
import com.ssafy.tadak.spring.product.domain.entity.Product;

public record BareboneDetailResponse(
		Long productId,
		String name,
		String manufacturer,
		String releaseDate,
		String keyLayout,
		List<String> features,
		String minPrice,
		String thumbnail,
		String detailImage,
		String url,
		int hits
) implements ProductDetailResponse {

	public static BareboneDetailResponse from(Product product, Barebone barebone) {
		BareboneDetailResponse response = new BareboneDetailResponse(
				product.getProductId(),
				product.getProductName(),
				barebone.getManufacturer(),
				barebone.getReleaseDate(),
				barebone.getKeyLayout(),
				barebone.getFeatures(),
				barebone.getMinPrice(),
				barebone.getThumbnail(),
				barebone.getDetailImage(),
				barebone.getUrl(),
				product.getHits()
		);

		List<String> list = response.features;
		Optional.ofNullable(barebone.getSize()).ifPresent(list::add);
		Optional.ofNullable(barebone.getConnectionType()).ifPresent(list::add);
		Optional.ofNullable(barebone.getContactType()).ifPresent(list::add);
		Optional.ofNullable(barebone.getInterfaceType()).ifPresent(list::add);

		return response;
	}
}

