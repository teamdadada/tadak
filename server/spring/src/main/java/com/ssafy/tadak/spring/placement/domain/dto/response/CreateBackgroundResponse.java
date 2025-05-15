package com.ssafy.tadak.spring.placement.domain.dto.response;

import lombok.Builder;

@Builder
public record CreateBackgroundResponse (
    Long id,
    String imageUrl,
    Double locationX,
    Double locationY,
    Double rotationX,
    Double rotationY,
    Double rotationZ
){
}
