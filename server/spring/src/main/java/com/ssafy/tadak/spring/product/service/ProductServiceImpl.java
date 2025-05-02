package com.ssafy.tadak.spring.product.service;

import org.springframework.stereotype.Service;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.repository.BareboneRepository;
import com.ssafy.tadak.spring.product.domain.repository.KeycapRepository;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepository;
import com.ssafy.tadak.spring.product.domain.repository.SwitchRepository;
import com.ssafy.tadak.spring.product.dto.request.ProductDetailRequest;
import com.ssafy.tadak.spring.product.dto.response.BareboneDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.KeycapDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.SwitchDetailResponse;
import com.ssafy.tadak.spring.product.exception.exception.ProductDetailNotFoundException;
import com.ssafy.tadak.spring.product.exception.exception.ProductNotFoundException;
import com.ssafy.tadak.spring.product.util.enums.ProductType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final BareboneRepository bareboneRepo;
	private final SwitchRepository switchRepo;
	private final KeycapRepository keycapRepo;

	/**
	 * 제품 타입과 ID를 기준으로 제품 상세 정보를 조회합니다.
	 * - MySQL에서 제품 존재 여부를 확인하고 조회수를 증가시킵니다.
	 * - MongoDB에서 제품 타입별로 상세 정보를 조회하여 응답합니다.
	 */
	@Override
	public ProductDetailResponse getProductDetail(ProductDetailRequest request) {
		Product product = productRepository.findByProductIdAndProductType(
			request.productId(), request.productType()
		).orElseThrow(() -> new ProductNotFoundException(request.productId()));

		product.increaseHits();
		productRepository.save(product);

		return getDetailByType(request.productType(), product.getProductId());
	}

	/**
	 * 제품 타입에 따라 MongoDB에서 해당 상세 정보를 조회합니다.
	 * - BAREBONE / SWITCH / KEYCAP 타입별로 분기
	 * - 상세 정보가 없을 경우 예외 발생
	 */
	private ProductDetailResponse getDetailByType(ProductType type, Long productId) {
		return switch (type) {
			case BAREBONE -> bareboneRepo.findByProductId(productId)
				.map(BareboneDetailResponse::from)
				.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
			case SWITCH -> switchRepo.findByProductId(productId)
				.map(SwitchDetailResponse::from)
				.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
			case KEYCAP -> keycapRepo.findByProductId(productId)
				.map(KeycapDetailResponse::from)
				.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
		};
	}

}
