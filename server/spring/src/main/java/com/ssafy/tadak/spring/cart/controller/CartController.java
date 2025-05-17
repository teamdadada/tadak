package com.ssafy.tadak.spring.cart.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.cart.dto.request.UpdateCartRequest;
import com.ssafy.tadak.spring.cart.dto.response.GetCartListResponse;
import com.ssafy.tadak.spring.cart.service.CartService;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping
    public ResponseEntity<Void> addToCart(
            @AuthUser UserInfo userinfo,
            @RequestBody @Valid UpdateCartRequest request
    ){
        System.out.println(request.keyboardIdList().size());
        cartService.addToCart(userinfo.id(), request.keyboardIdList());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<GetCartListResponse>> getCartList(
            @AuthUser UserInfo userInfo
    ){
        return ResponseEntity.ok(
                cartService.getUserCart(userInfo.id())
        );
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFromCart(
            @RequestBody @Valid UpdateCartRequest request
    ){
        cartService.deleteItemList(request.keyboardIdList());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
