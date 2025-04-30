package com.tadak.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(
    val userId: String,
    val password: String,
)
