package com.tadak.exception.error_code

import com.tadak.exception.ErrorCode

enum class UserErrorCode(
    val code: String,
    val message: String
) {
    // 400
    USER_BAD_REQUEST("U4000", "요청을 처리하는데 필요한 인자가 NULL을 참조합니다."),

    // 404
    USER_NOT_FOUND("U4040", "해당하는 유저를 찾을 수 없습니다."),

    // 409
    DUPLICATE_USER_ID("U4090", "일치하는 회원 ID가 존재합니다.");

    fun toErrorCode(): ErrorCode {
        return ErrorCode(code, message)
    }
}