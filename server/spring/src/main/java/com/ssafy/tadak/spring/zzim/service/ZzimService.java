package com.ssafy.tadak.spring.zzim.service;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.NotFoundException;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepository;
import com.ssafy.tadak.spring.product.domain.repository.ProductRepositoryCustom;
import com.ssafy.tadak.spring.zzim.domain.ZzimRepository;
import com.ssafy.tadak.spring.zzim.domain.entity.Zzim;
import com.ssafy.tadak.spring.zzim.dto.ZzimDto;
import com.ssafy.tadak.spring.zzim.dto.response.ZzimListResponse;
import com.ssafy.tadak.spring.zzim.exception.ZzimErrorCode;
import com.ssafy.tadak.spring.zzim.exception.ZzimException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static com.ssafy.tadak.spring.zzim.exception.ZzimException.ZzimNotFoundException;
import static com.ssafy.tadak.spring.zzim.exception.ZzimException.ZzimConflictException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZzimService {

    private final ZzimRepository zzimRepository;
    private final ProductRepositoryCustom productRepositoryCustom;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public ZzimListResponse getZzimsByUserId(UserInfo userInfo) {
        List<Zzim> zzims = zzimRepository.findAllByOwnerId(userInfo.id().longValue());
        List<Long> productIds = zzims.stream().map(Zzim::getProductId).toList();
        List<Map<String, Object>> products = productRepositoryCustom.findByIds(productIds);

        Map<Long, Map<String, Object>> productMap = products.stream()
                .collect(Collectors.toMap(
                        p -> ((Number) p.get("product_id")).longValue(),
                        Function.identity()
                ));

        List<ZzimDto> merged = zzims.stream()
                .map(zzim -> {
                    return ZzimDto.of(zzim, productMap);
                })
                .toList();

        ZzimListResponse response = ZzimListResponse.of(userInfo, merged);

        return response;
    }

    @Transactional
    public long addZzim(UserInfo userInfo, long productId) {
        checkProductExist(productId);
        checkZzimByUserIdAndProductId(userInfo.id(), productId);

        Zzim zzim = Zzim.builder()
                .ownerId(userInfo.id().longValue())
                .productId(productId)
                .build();

        zzimRepository.save(zzim);

        return zzim.getZzimId();
    }

    @Transactional
    public void deleteZzim(UserInfo userInfo, long productId) {
        Zzim zzim = findZzimByUserIdAndProductId(userInfo.id(), productId);
        zzimRepository.delete(zzim);
    }

    private void checkZzimByUserIdAndProductId(long userId, long productId) {
        zzimRepository.findByProductIdAndOwnerId(productId, userId)
                .ifPresent(zzim -> {
                    throw new ZzimConflictException(ZzimErrorCode.ZZIM_ALREADY_EXIST);
                });
    }

    private Zzim findZzimByUserIdAndProductId(long userId, long productId) {
        return zzimRepository.findByProductIdAndOwnerId(productId, userId)
                .orElseThrow(() -> new ZzimException.ZzimNotFoundException(ZzimErrorCode.ZZIM_NOT_FOUND));
    }

    private void checkProductExist(long productId) {
        productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(new ErrorCode("P4040", "존재하지 않는 상품입니다.")));
    }
}
