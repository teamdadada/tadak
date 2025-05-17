package com.ssafy.tadak.spring.cart.service;

import com.ssafy.tadak.spring.cart.domain.entity.Cart;
import com.ssafy.tadak.spring.cart.domain.entity.CartItem;
import com.ssafy.tadak.spring.cart.domain.repository.CartItemJpaRepository;
import com.ssafy.tadak.spring.cart.domain.repository.CartJpaRepository;
import com.ssafy.tadak.spring.cart.dto.response.GetCartListResponse;
import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {
    private final CartJpaRepository cartJpaRepository;
    private final CartItemJpaRepository cartItemJpaRepository;
    private final KeyboardJpaRepository keyboardJpaRepository;
    private final MinioUtil minioUtil;

    //fixme: 장바구니도 유저 배치 기본이미지와 마찬가지로
    // 유저가 가입할 때 한 번만 생성되도록 할 수 있을 것 같습니다.
    /** 장바구니에 키보드 추가
     * 유저의 장바구니에 커스텀 키보드를 추가합니다.
     * **/
    @Transactional
    public void addToCart(
            Long userId,
            List<Long> keyboardIdList
    ){
        Cart userCart = cartJpaRepository.findByUserId(userId);
        if(userCart == null){
            userCart = createCart(userId);
        }

        for(Long keyboardId : keyboardIdList){
            System.out.println(keyboardId);
            Keyboard keyboard = keyboardJpaRepository.getReferenceById(keyboardId);
            cartItemJpaRepository.save(
                    CartItem.builder()
                            .keyboard(keyboard)
                            .cart(userCart)
                            .build()
            );
        }
    }

    @Transactional
    public List<GetCartListResponse> getUserCart(Long userId){
        Cart userCart = cartJpaRepository.findByUserId(userId);
        if(userCart == null){
            userCart = createCart(userId);
            return List.of();
        }

        List<CartItem> itemList = cartItemJpaRepository.findAllByCart(userCart);

        return itemList.stream()
                .map(item->{
                    Keyboard keyboard = item.getKeyboard();
                    Image thumbnail = keyboard.getThumbnail();
                    String thumbnailUrl = null;

                    try{
                        thumbnailUrl = minioUtil.getImageUrl(
                                thumbnail.getBucket(),thumbnail.getFilePath()
                        );
                    } catch (Exception e) {
                        throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
                    }

                    return GetCartListResponse.builder()
                            .itemId(item.getId())
                            .keyboardName(keyboard.getName())
                            .thumbnailUrl(thumbnailUrl)
                            .totalPrice(keyboard.getPrice())
                            .build();
                })
                .toList();
    }

    @Transactional
    public void deleteItemList(
            List<Long> itemIdList
    ){
        cartItemJpaRepository.deleteAllById(itemIdList);
    }

    private Cart createCart(Long userId){
        return cartJpaRepository.save(new Cart(userId));
    }
}
