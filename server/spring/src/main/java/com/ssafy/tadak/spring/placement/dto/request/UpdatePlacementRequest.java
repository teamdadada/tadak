package com.ssafy.tadak.spring.placement.dto.request;

import com.ssafy.tadak.spring.placement.dto.VectorDto;

public record UpdatePlacementRequest(
        Long keyboardId,
        Long placementId,
        VectorDto.Vector2 position,
        VectorDto.Vector3 rotation,
        VectorDto.Vector3 scale
) {
}
