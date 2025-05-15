package com.ssafy.tadak.spring.keyboard.dto;

import com.ssafy.tadak.spring.keyboard.domain.entity.BareboneOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeycapOption;
import com.ssafy.tadak.spring.keyboard.domain.entity.SwitchOption;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import lombok.Builder;

@Builder
public record KeyboardUpdateDto (
        String name,
        Image thumbnail,
        Image model,
        Integer price,
        Colors colors,
        BareboneOption bareboneOption,
        SwitchOption switchOption,
        KeycapOption keycapOption
){
}
