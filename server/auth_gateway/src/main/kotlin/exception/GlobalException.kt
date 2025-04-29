package com.tadak.exception

import io.ktor.http.HttpStatusCode

class GlobalException(
    val errorCode: ErrorCode,
    val status: HttpStatusCode
) : RuntimeException(errorCode.message)