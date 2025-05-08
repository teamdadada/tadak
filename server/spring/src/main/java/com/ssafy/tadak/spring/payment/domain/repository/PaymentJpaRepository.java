package com.ssafy.tadak.spring.payment.domain.repository;

import com.ssafy.tadak.spring.payment.domain.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentJpaRepository extends JpaRepository<Payment, Long> {
}
