package com.tadak.exception.status

import com.tadak.exception.ErrorCode
import com.tadak.exception.GlobalException

import io.ktor.http.HttpStatusCode

class NotFoundException(
    errorCode: ErrorCode,
) : GlobalException(errorCode, HttpStatusCode.NotFound)