package com.ssafy.tadak.spring.placement.dto.response;

public record GetPlacementDetailResponse(
        Long backgroundId,
        Long keyboardId,
        Vector2 position,
        Vector3 rotation,
        Vector3 scale,
        Boolean isDefault
){
    public record Vector2(
            Double x,
            Double y
    ){}

    public record Vector3(
            Double x,
            Double y,
            Double z
    ){}
}
