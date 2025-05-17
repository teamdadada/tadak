package com.ssafy.tadak.spring.cart.dto.request;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public record UpdateCartRequest(
        @NotNull
        List<Long> keyboardIdList
){
}
