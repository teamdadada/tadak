package com.tadak.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class PasswordPatchRequest(
    val old: String,
    val new: String
)
