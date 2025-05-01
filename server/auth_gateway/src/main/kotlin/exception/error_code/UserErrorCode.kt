package com.tadak.exception.error_code

import com.tadak.exception.ErrorCode

enum class UserErrorCode(
    val code: String,
    val message: String
) {
    // 409
    DUPLICATE_USER_ID("U4090", "일치하는 회원 ID가 존재합니다.");

    fun toErrorCode(): ErrorCode {
        return ErrorCode(code, message)
    }
}