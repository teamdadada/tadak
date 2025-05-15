package com.ssafy.tadak.spring.keyboard.domain;

import com.ssafy.tadak.spring.minio.domain.entity.Image;

public interface ProductOption {
    Long getId();
    String getName();
    Integer getPrice();
    Integer getQuantity();
    Image getImage();
}

