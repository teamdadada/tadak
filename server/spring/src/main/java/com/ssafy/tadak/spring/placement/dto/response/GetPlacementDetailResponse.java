package com.ssafy.tadak.spring.placement.dto.response;

import com.ssafy.tadak.spring.placement.dto.VectorDto;
import lombok.Builder;

@Builder
public record GetPlacementDetailResponse(
        Long placementId,
        VectorDto.Vector2 position,
        VectorDto.Vector3 rotation,
        VectorDto.Vector3 scale,
        String imageUrl
){
}
