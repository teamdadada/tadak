package com.ssafy.tadak.spring.payment.dto.request;

public record PaymentRequest (
        String orderId,
        Integer userId,
        Integer orderPrice
){
}
