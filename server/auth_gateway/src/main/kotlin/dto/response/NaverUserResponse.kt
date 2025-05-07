package com.tadak.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class NaverUserResponse(
    val resultcode: String,
    val message: String,
    val response: NaverUserResponseData
) {
    @Serializable
    data class NaverUserResponseData(
        val id: String,
        val name: String
    )
}