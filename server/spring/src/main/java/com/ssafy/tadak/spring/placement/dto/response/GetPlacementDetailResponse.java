package com.ssafy.tadak.spring.placement.dto.response;

import com.ssafy.tadak.spring.placement.dto.VectorDto;

public record GetPlacementDetailResponse(
        Long backgroundId,
        Long keyboardId,
        VectorDto.Vector2 position,
        VectorDto.Vector3 rotation,
        VectorDto.Vector3 scale,
        Boolean isDefault
){
}
