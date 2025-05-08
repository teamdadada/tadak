package com.ssafy.tadak.spring.payment.dto;

public record Item(
        String id,
        String name,
        int price,
        String currency
) {
}

