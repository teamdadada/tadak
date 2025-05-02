package com.ssafy.tadak.spring.auth.dto;

public record UserInfo (
        Integer id,
        String nickname,
        String role
){
}
