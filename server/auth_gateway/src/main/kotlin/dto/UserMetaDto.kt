package com.tadak.dto

import com.tadak.domain.entity.User
import kotlinx.serialization.Serializable

@Serializable
data class UserMetaDto(
    val userUuid: Long,
    val nickname: String,
    val userType: String
) {
    companion object {
        fun from(entity: User): UserMetaDto {
            return UserMetaDto(
                userUuid = entity.id.value,
                nickname = entity.userName,
                userType = entity.userType
            )
        }
    }
}