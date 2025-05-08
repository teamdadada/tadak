package com.ssafy.tadak.spring.payment.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Payment{
        @Id
        int id;

        @Column(nullable = false, name="user_id")
        String userId;

        @Column(nullable = false, name = "order_price")
        Integer orderPrice;

        @Column(nullable = false)
        @Enumerated(EnumType.STRING)
        PaymentStatus status;

        @Column(name = "created_at")
        LocalDateTime createdAt;

        @Column(name = "updated_at")
        LocalDateTime updatedAt;
}
