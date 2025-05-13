package com.tadak.dto

import io.ktor.util.*

val AuthenticatedUserKey = AttributeKey<AuthenticatedUser>("AuthenticatedUser")

data class AuthenticatedUser(
    val userUuid: Long,
)
