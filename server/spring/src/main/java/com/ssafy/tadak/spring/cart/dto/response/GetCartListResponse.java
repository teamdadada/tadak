package com.ssafy.tadak.spring.cart.dto.response;

import lombok.Builder;

@Builder
public record GetCartListResponse (
        Long itemId,
        String keyboardName,
        String thumbnailUrl,
        Integer totalPrice
){
}
