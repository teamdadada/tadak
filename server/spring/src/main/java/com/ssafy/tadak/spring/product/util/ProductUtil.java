package com.ssafy.tadak.spring.product.util;

import com.ssafy.tadak.spring.product.domain.entity.Barebone;
import com.ssafy.tadak.spring.product.domain.entity.Keycap;
import com.ssafy.tadak.spring.product.domain.entity.Product;
import com.ssafy.tadak.spring.product.domain.entity.Switch;
import com.ssafy.tadak.spring.product.domain.repository.BareboneRepository;
import com.ssafy.tadak.spring.product.domain.repository.KeycapRepository;
import com.ssafy.tadak.spring.product.domain.repository.SwitchRepository;
import com.ssafy.tadak.spring.product.dto.response.detail.BareboneDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.detail.KeycapDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.detail.SwitchDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.filter.ProductFilterResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.exception.exception.ProductDetailNotFoundException;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static com.ssafy.tadak.spring.product.util.ProductFilterUtil.getProductFilter;

@Component
@RequiredArgsConstructor
public class ProductUtil {

    private final BareboneRepository bareboneRepository;
    private final SwitchRepository switchRepository;
    private final KeycapRepository keycapRepository;

    /**
     * 제품 타입에 따라 MongoDB에서 해당 상세 정보를 조회합니다.
     *
     * @param product 제품 기본 정보
     * @return 제품 상세 정보
     */
    public ProductDetailResponse getDetailByType(Product product) {
        return switch (product.getProductType()) {
            case BAREBONE -> getBareboneDetail(product);
            case SWITCH -> getSwitchDetail(product);
            case KEYCAP -> getKeycapDetail(product);
        };
    }

    /**
     * 제품 타입에 따른 필터링 리스트를 제공하되, 많은 리스트부터 제공합니다.
     *
     * @param type     제품 타입
     * @param products 제품 리스트
     * @return 제품 필터 리스트
     */
    public ProductFilterResponse getFilterByType(ProductType type, List<Product> products) {
        return switch (type) {
            case BAREBONE -> getBareboneFilter(products);
            case SWITCH -> getSwitchFilter(products);
            case KEYCAP -> getKeycapFilter(products);
        };
    }

    public ProductSimpleDto getSimpleSummary(Product product) {
        return switch (product.getProductType()) {
            case BAREBONE -> bareboneRepository.findByProductId(product.getProductId())
                    .map(b -> ProductSimpleDto.from(product, b.getMinPrice(), b.getThumbnail()))
                    .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));

            case SWITCH -> switchRepository.findByProductId(product.getProductId())
                    .map(s -> ProductSimpleDto.from(product, s.getMinPrice(), s.getThumbnail()))
                    .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));

            case KEYCAP -> keycapRepository.findByProductId(product.getProductId())
                    .map(k -> ProductSimpleDto.from(product, k.getMinPrice(), k.getThumbnail()))
                    .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));
        };
    }

    private ProductDetailResponse getBareboneDetail(Product product) {
        return bareboneRepository.findByProductId(product.getProductId())
                .map(b -> BareboneDetailResponse.from(product, b))
                .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));
    }

    private ProductDetailResponse getSwitchDetail(Product product) {
        return switchRepository.findByProductId(product.getProductId())
                .map(s -> SwitchDetailResponse.from(product, s))
                .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));
    }

    private ProductDetailResponse getKeycapDetail(Product product) {
        return keycapRepository.findByProductId(product.getProductId())
                .map(k -> KeycapDetailResponse.from(product, k))
                .orElseThrow(() -> new ProductDetailNotFoundException(product.getProductId(), product.getProductType()));
    }

    private ProductFilterResponse getBareboneFilter(List<Product> products) {
        List<Long> ids = products.stream().map(Product::getProductId).toList();
        List<Barebone> barebones = bareboneRepository.findByProductIdIn(ids);

        Map<String, Function<Barebone, ?>> fields = Map.of(
                "manufacturer", Barebone::getManufacturer,
                "keyLayout", Barebone::getKeyLayout,
                "features", Barebone::getFeatures
        );

        return new ProductFilterResponse(getProductFilter(barebones, fields));
    }

    private ProductFilterResponse getSwitchFilter(List<Product> products) {
        List<Long> ids = products.stream().map(Product::getProductId).toList();
        List<Switch> switches = switchRepository.findByProductIdIn(ids);

        Map<String, Function<Switch, ?>> fields = Map.of(
                "quantity", Switch::getQuantity,
                "switchType", Switch::getSwitchType,
                "keyForce", Switch::getKeyForce
        );

        return new ProductFilterResponse(getProductFilter(switches, fields));
    }

    private ProductFilterResponse getKeycapFilter(List<Product> products) {
        List<Long> ids = products.stream().map(Product::getProductId).toList();
        List<Keycap> keycaps = keycapRepository.findByProductIdIn(ids);

        Map<String, Function<Keycap, ?>> fields = Map.of(
                "keycapMaterial", Keycap::getKeycapMaterial,
                "engravingPosition", Keycap::getEngravingPosition,
                "keyCount", Keycap::getKeyCount
        );

        return new ProductFilterResponse(getProductFilter(keycaps, fields));
    }
}
