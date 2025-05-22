package com.ssafy.tadak.spring.cart.domain.repository;

import com.ssafy.tadak.spring.cart.domain.entity.Cart;
import com.ssafy.tadak.spring.cart.domain.entity.CartItem;
import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemJpaRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllByCart(Cart cart);

    List<CartItem> getReferenceByKeyboard(Keyboard keyboard);
}
