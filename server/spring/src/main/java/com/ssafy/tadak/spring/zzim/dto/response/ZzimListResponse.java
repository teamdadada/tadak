package com.ssafy.tadak.spring.zzim.dto.response;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.product.dto.response.detail.ProductDetailResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductListResponse;
import com.ssafy.tadak.spring.product.dto.response.list.ProductSimpleDto;
import com.ssafy.tadak.spring.product.util.enums.ProductType;
import com.ssafy.tadak.spring.zzim.domain.entity.Zzim;
import com.ssafy.tadak.spring.zzim.dto.ZzimDto;

import java.util.List;
import java.util.Map;

public record ZzimListResponse(
        Long userId,
        int count,
        List<ZzimDto> zzims
) {
    public static ZzimListResponse of(UserInfo userInfo, List<ZzimDto> zzims) {
        return new ZzimListResponse(
                userInfo.id().longValue(),
                zzims.size(),
                zzims
        );
    }
}
