package com.ssafy.tadak.spring.cart.domain.repository;

import com.ssafy.tadak.spring.cart.domain.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartJpaRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long userId);
}
