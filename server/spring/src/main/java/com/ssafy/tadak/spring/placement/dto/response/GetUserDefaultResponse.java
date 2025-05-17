package com.ssafy.tadak.spring.placement.dto.response;

import com.ssafy.tadak.spring.placement.dto.VectorDto;
import lombok.Builder;

@Builder
public record GetUserDefaultResponse(
        Long placementId,
        Long keyboardId,
        VectorDto.Vector2 position,
        VectorDto.Vector3 rotation,
        VectorDto.Vector3 scale,
        String imageUrl,
        String model3dUrl
){
}
