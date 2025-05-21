package com.tadak.dto

import kotlinx.serialization.Serializable

@Serializable
data class SignUpRequest(
    val userId: String,
    val password: String,
    val nickname: String
)