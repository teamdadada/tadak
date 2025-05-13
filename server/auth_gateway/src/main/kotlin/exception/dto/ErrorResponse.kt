package com.tadak.exception.dto

import com.tadak.exception.ErrorCode
import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    val code: String,
    val message: String
) {
    companion object {
        fun from(errorCode: ErrorCode): ErrorResponse {
            return ErrorResponse(
                code = errorCode.code,
                message = errorCode.message
            )
        }
    }
}