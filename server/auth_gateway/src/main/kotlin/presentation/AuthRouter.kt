package com.tadak.presentation

import com.tadak.domain.entity.User
import com.tadak.domain.table.Users
import com.tadak.dto.UserMetaDto
import com.tadak.dto.request.LoginRequest
import com.tadak.exception.error_code.AuthErrorCode
import com.tadak.exception.status.BadRequestException
import com.tadak.exception.status.UnauthorizedException
import com.tadak.util.JwtUtil
import com.tadak.util.PasswordUtil
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.authRoutes() {
    route("/auth") {
        post("/login") {
            val request = call.receive<LoginRequest>()

            val user = transaction {
                User.find { Users.userId eq request.userId }.singleOrNull()
            }

            if (user == null) {
                throw UnauthorizedException(AuthErrorCode.UNAUTHORIZED.toErrorCode())
            }

            val passwordMatches = PasswordUtil.verify(request.password, user.userPassword)

            if (!passwordMatches) {
                throw UnauthorizedException(AuthErrorCode.UNAUTHORIZED.toErrorCode())
            }

            val userMetaDto = UserMetaDto.from(user)
            val accessToken = JwtUtil.generateToken(userMetaDto, "access")
            val refreshToken = JwtUtil.generateToken(userMetaDto, "refresh")

            call.response.headers.append("Authorization", "Bearer $accessToken")
            call.response.cookies.append(
                Cookie(
                    name = "refresh_token",
                    value = refreshToken,
                    httpOnly = true,
                    secure = true,
                    path = "/",
                    maxAge = 60 * 60 * 24 * 31 // 31일
                )
            )

            call.respond(
                HttpStatusCode.OK
            )
        }

        get("/check") {
            val accessToken = call.request.headers["Authorization"]?.removePrefix("Bearer ")?.trim()

            if (accessToken.isNullOrBlank()) {
                throw BadRequestException(AuthErrorCode.NO_BEARER_TOKEN.toErrorCode())
            }

            JwtUtil.verifyAndDecode(accessToken)
            call.respond(HttpStatusCode.OK)
        }

        post("/reissue") {
            val refreshToken = call.request.cookies["refresh_token"]
                ?: throw UnauthorizedException(AuthErrorCode.NO_BEARER_TOKEN.toErrorCode())

            val userMetaDto = JwtUtil.verifyAndDecode(refreshToken)

            val newAccessToken = JwtUtil.generateToken(userMetaDto, "access")
            val newRefreshToken = JwtUtil.generateToken(userMetaDto, "refresh")

            call.response.headers.append("Authorization", "Bearer $newAccessToken")
            call.response.cookies.append(
                Cookie(
                    name = "refresh_token",
                    value = newRefreshToken,
                    path = "/",
                    httpOnly = true,
                    secure = true,
                    maxAge = 60 * 60 * 24 * 31 // 31일
                )
            )

            call.respond(
                HttpStatusCode.Created
            )
        }
    }

}