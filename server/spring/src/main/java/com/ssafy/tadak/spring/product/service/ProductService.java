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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import static com.ssafy.tadak.spring.product.util.enums.ProductType.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

	private final ProductRepository productRepository;
	private final BareboneRepository bareboneRepo;
	private final SwitchRepository switchRepo;
	private final KeycapRepository keycapRepo;

	/**
	 * 제품 타입과 ID를 기준으로 제품 상세 정보를 조회합니다.
	 * - MySQL에서 제품 존재 여부를 확인하고 조회수를 증가시킵니다.
	 * - MongoDB에서 제품 타입별로 상세 정보를 조회하여 응답합니다.
	 */
	public ProductDetailResponse getProductDetail(ProductType productType, Long productId) {

		ProductDetailRequest request = new ProductDetailRequest(productType, productId);
		Product product = productRepository.findByProductIdAndProductType(
			request.productId(), request.productType()
		).orElseThrow(() -> new ProductNotFoundException(request.productId()));

		product.increaseHits();

		return getDetailByType(product);
	}

	/**
	 * 제품 타입에 따라 MongoDB에서 해당 상세 정보를 조회합니다.
	 * - BAREBONE / SWITCH / KEYCAP 타입별로 분기
	 * - 상세 정보가 없을 경우 예외 발생
	 */
	private ProductDetailResponse getDetailByType(Product product) {
		Long productId = product.getProductId();
		ProductType type = product.getProductType();

		return switch (type) {
			case BAREBONE -> bareboneRepo.findByProductId(productId)
					.map(barebone -> BareboneDetailResponse.from(product, barebone))
					.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
			case SWITCH -> switchRepo.findByProductId(productId)
					.map(switchProduct -> SwitchDetailResponse.from(product, switchProduct))
					.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
			case KEYCAP -> keycapRepo.findByProductId(productId)
					.map(keycap -> KeycapDetailResponse.from(product, keycap))
					.orElseThrow(() -> new ProductDetailNotFoundException(productId, type));
		};
	}

}
