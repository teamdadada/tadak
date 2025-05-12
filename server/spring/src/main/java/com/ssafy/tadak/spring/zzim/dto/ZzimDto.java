package com.ssafy.tadak.spring.zzim.dto;

import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductListResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.zzim.domain.entity.Zzim;

import java.util.Map;

public record ZzimDto(
        long zzimId,
        ProductSimpleDto item
) {
    public static ZzimDto of(Zzim zzim, Map<Long, Map<String, Object>> pm) {
        Map<String, Object> p = pm.get(zzim.getProductId());
        return new ZzimDto(
                zzim.getZzimId(),
                ProductSimpleDto.from(
                        p,
                        ProductType.valueOf(p.get("type").toString()),
                        null
                )
        );
    }
}
