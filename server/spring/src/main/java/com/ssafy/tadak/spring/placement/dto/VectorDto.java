package com.ssafy.tadak.spring.placement.dto;

import lombok.Builder;

public record VectorDto(
){
    @Builder
    public record Vector2(
            Double x,
            Double y
    ){}

    @Builder
    public record Vector3(
            Double x,
            Double y,
            Double z
    ){}
}
