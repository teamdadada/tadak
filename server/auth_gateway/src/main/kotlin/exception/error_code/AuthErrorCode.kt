package com.tadak.exception.error_code

import com.tadak.exception.ErrorCode

enum class AuthErrorCode(
    val code: String,
    val message: String
) {
    // 401
    UNAUTHORIZED("B4011", "인증에 실패했습니다."),
    EXPIRED_JWT_TOKEN("B4012", "만료된 JWT 토큰입니다."),

    // 403
    FORBIDDEN("B4031", "접근 권한이 없습니다.");

    fun toErrorCode(): ErrorCode {
        return ErrorCode(code, message)
    }
}