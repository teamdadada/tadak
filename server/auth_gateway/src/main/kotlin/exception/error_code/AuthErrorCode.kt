package com.tadak.exception.error_code

import com.tadak.exception.ErrorCode

enum class AuthErrorCode(
    val code: String,
    val message: String
) {
    // 400
    NO_BEARER_TOKEN("B4000", "요청에서 토큰을 찾을 수 없습니다."),

    // 401
    UNAUTHORIZED("B4010", "일치하는 회원 정보를 찾을 수 없습니다."),
    UNAUTHORIZED_REQUEST("B4011", "로그인되지 않은 사용자입니다."),
    INVALID_JWT_TOKEN("B4011", "유효하지 않은 토큰입니다."),


    // 403
    FORBIDDEN("B4031", "접근 권한이 없습니다.");

    fun toErrorCode(): ErrorCode {
        return ErrorCode(code, message)
    }
}