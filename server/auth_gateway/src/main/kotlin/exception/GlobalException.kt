package com.tadak.exception

import io.ktor.http.HttpStatusCode

open class GlobalException(
    val errorCode: ErrorCode,
    val status: HttpStatusCode
) : RuntimeException(errorCode.message)