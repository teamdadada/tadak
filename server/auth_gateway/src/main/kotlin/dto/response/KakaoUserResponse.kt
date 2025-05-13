package com.tadak.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class KakaoUserResponse(
    val id: Long,
    val kakao_account: KakaoAccount
) {
    @Serializable
    data class KakaoAccount(
        val profile: Profile
    ) {
        @Serializable
        data class Profile(
            val nickname: String,
            val profile_image_url: String
        )
    }
}