package com.tadak.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class KakaoTokenResponse(
    val access_token: String,
    val token_type: String,
    val refresh_token: String,
    val expires_in: Int,
    val refresh_token_expires_in: Int,
    val scope: String
)