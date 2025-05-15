package com.ssafy.tadak.spring.placement.domain.dto.request;

public record CreateBackgroundRequest (
        Double locationX,
        Double locationY,
        Double rotationX,
        Double rotationY,
        Double rotationZ
){
}
