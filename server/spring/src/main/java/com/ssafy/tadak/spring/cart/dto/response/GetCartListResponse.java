package com.ssafy.tadak.spring.cart.dto.response;

import lombok.Builder;

@Builder
public record GetCartListResponse (
        Long itemId,
        Long keyboardId,
        String keyboardName,
        String thumbnailUrl,
        Integer totalPrice
){
}
