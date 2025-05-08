package com.ssafy.tadak.spring.payment.dto;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portone.secret")
public record PortOneSecret (
        String apiKey,
        String webhookKey
){
}
