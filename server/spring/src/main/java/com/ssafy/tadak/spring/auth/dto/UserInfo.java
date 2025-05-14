package com.ssafy.tadak.spring.auth.dto;

public record UserInfo (
        Long id,
        String nickname,
        String role
){
}
