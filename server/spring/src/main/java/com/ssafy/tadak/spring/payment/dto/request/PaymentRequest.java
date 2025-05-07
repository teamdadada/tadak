package com.ssafy.tadak.spring.payment.dto.request;

public record PaymentRequest (
        String impUid,
        String merchantUid,
        Integer amount
){
}
