package com.tadak.exception

import com.tadak.exception.GlobalException
import com.tadak.exception.dto.ErrorResponse
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.http.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import org.slf4j.LoggerFactory

fun Application.configureExceptionHandler() {

    val log = LoggerFactory.getLogger("GlobalExceptionHandler")

    install(StatusPages) {

        // GlobalException 핸들링
        exception<GlobalException> { call, cause ->
            val errorCode = cause.errorCode

            log.warn(
                """
                request = ${call.request.httpMethod.value} ${call.request.uri}
                class = ${cause::class.simpleName}
                code = ${errorCode.code}
                message = ${errorCode.message}
                """.trimIndent()
            )
            cause.printStackTrace()

            call.respond(
                cause.status,
                ErrorResponse.from(errorCode)
            )
        }

        // 요청 파싱 관련 예외 (ex: JSON 파싱 오류)
        exception<BadRequestException> { call, cause ->
            val errorMessage = cause.message ?: "Invalid request"

            log.warn(
                """
                request = ${call.request.httpMethod.value} ${call.request.uri}
                class = ${cause::class.simpleName}
                code = 400
                message = $errorMessage
                """.trimIndent()
            )
            cause.printStackTrace()

            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse(code = "400", message = errorMessage)
            )
        }

        // 그 외 모든 Exception
        exception<Throwable> { call, cause ->
            log.warn(
                """
                request = ${call.request.httpMethod.value} ${call.request.uri}
                class = ${cause::class.simpleName}
                code = 500
                message = ${cause.message}
                """.trimIndent()
            )
            cause.printStackTrace()

            call.respond(HttpStatusCode.InternalServerError,
                ErrorResponse(code = "500", message = "서버에서 오류가 발생하였습니다. 잠시후 다시 시도해주세요"))
        }
    }
}