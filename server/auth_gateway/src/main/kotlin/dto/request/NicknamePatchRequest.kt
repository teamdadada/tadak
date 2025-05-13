package com.tadak.dto.request
import kotlinx.serialization.Serializable

@Serializable
data class NicknamePatchRequest(
    val nickname: String
)
