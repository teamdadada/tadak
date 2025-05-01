package com.tadak.dto.response

import com.tadak.domain.entity.User
import kotlinx.serialization.Serializable

@Serializable
data class UserSelectResponse(
    val userUuid: Long,
    val userName: String,
    val userType: String,
    val profileImg: String
) {
    companion object {
        fun from(user: User) = UserSelectResponse(
            userUuid = user.id.value,
            userName = user.userName,
            userType = user.userType,
            profileImg = user.profileImg
        )
    }
}