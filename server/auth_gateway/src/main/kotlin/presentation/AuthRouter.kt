package com.tadak.presentation

import com.tadak.config.HttpClientProvider
import com.tadak.domain.entity.User
import com.tadak.domain.table.OAuthUsers
import com.tadak.domain.table.Users
import com.tadak.dto.UserMetaDto
import com.tadak.dto.request.LoginRequest
import com.tadak.dto.response.KakaoTokenResponse
import com.tadak.dto.response.KakaoUserResponse
import com.tadak.dto.response.NaverTokenResponse
import com.tadak.dto.response.NaverUserResponse
import com.tadak.exception.error_code.AuthErrorCode
import com.tadak.exception.error_code.UserErrorCode
import com.tadak.exception.status.BadRequestException
import com.tadak.exception.status.NotFoundException
import com.tadak.exception.status.UnauthorizedException
import com.tadak.util.JwtUtil
import com.tadak.util.PasswordUtil
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.request.forms.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import io.netty.handler.codec.http.cookie.CookieHeaderNames
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*
import kotlin.reflect.typeOf

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
                    maxAge = 60 * 60 * 24 * 31,
                    extensions = mapOf("SameSite" to "None") // 👈 핵심!
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

        post("/kakao") {
            /* ────── 0. 설정 값 ────── */
            val code = call.request.headers["X-Author-Code"]
                ?: throw UnauthorizedException(AuthErrorCode.NO_AUTHOR_CODE.toErrorCode())
            val env = when (val rawEnv = call.request.headers["X-Environment"]?.lowercase()) {
                "local", "dev", "deploy" -> rawEnv
                else                     -> "deploy"
            }

            val cfg          = call.application.environment.config
            val tokenUri     = cfg.property("oauth.kakao.token-uri").getString()
            val userUri      = cfg.property("oauth.kakao.user-uri").getString()
            val clientId     = cfg.property("oauth.kakao.client-id").getString()
            val redirectUri = cfg
                .property("oauth.kakao.${env}-redirect-uri")
                .getString()


            /* ────── 1. access_token 요청 ────── */
            val tokenResponse = HttpClientProvider.client.submitForm(
                url = tokenUri,
                formParameters = Parameters.build {
                    append("grant_type", "authorization_code")
                    append("client_id", clientId)
                    append("redirect_uri", redirectUri)
                    append("code", code)
                }
            )
            if (!tokenResponse.status.isSuccess())
                throw UnauthorizedException(AuthErrorCode.INVALID_OAUTH_TOKEN.toErrorCode())

            val tokenInfo: KakaoTokenResponse = tokenResponse.body()

            /* ────── 2. 사용자 정보 요청 ────── */
            val kakaoUser: KakaoUserResponse = HttpClientProvider.client.get(userUri) {
                headers {
                    append(HttpHeaders.Authorization, "Bearer ${tokenInfo.access_token}")
                    append(HttpHeaders.Accept, "application/json")
                }
                url {
                    parameters.append("secure_resource", "true")
                    parameters.append("property_keys", """["kakao_account.profile"]""")
                }
            }.body()

            val kakaoId       = kakaoUser.id.toString()
            val nickname      = kakaoUser.kakao_account.profile.nickname

            /* ────── 3. 회원 조회/생성 ────── */
            val userMetaDto = transaction {
                val mappingRow = OAuthUsers
                    .select(OAuthUsers.provider, OAuthUsers.providerUserId, OAuthUsers.userUuid)
                    .where {
                        (OAuthUsers.provider eq "KAKAO") and
                                (OAuthUsers.providerUserId eq kakaoId)
                    }
                    .singleOrNull()

                val userEntity = if (mappingRow == null) {
                    val userPk = Users.insertAndGetId {
                        it[userId]       = "kakao_${UUID.randomUUID().toString().take(8)}"
                        it[userPassword] = PasswordUtil.hashPassword(UUID.randomUUID().toString())
                        it[userName]     = nickname
                        it[loginType]    = "KAKAO"
                    }.value

                    OAuthUsers.insert {
                        it[provider]       = "KAKAO"
                        it[providerUserId] = kakaoId
                        it[userUuid]       = userPk
                    }

                    User.findById(userPk)
                } else {
                    User.findById(mappingRow[OAuthUsers.userUuid])
                } ?: throw NotFoundException(UserErrorCode.USER_NOT_FOUND.toErrorCode())

                UserMetaDto.from(userEntity)
            }

            /* ────── 4. JWT 발급 & 응답 ────── */
            val accessToken  = JwtUtil.generateToken(userMetaDto, "access")
            val refreshToken = JwtUtil.generateToken(userMetaDto, "refresh")

            call.response.headers.append("Authorization", "Bearer $accessToken")
            call.response.cookies.append(
                Cookie(
                    name     = "refresh_token",
                    value    = refreshToken,
                    httpOnly = true,
                    secure   = true,
                    path     = "/",
                    maxAge   = 60 * 60 * 24 * 31,
                    extensions = mapOf("SameSite" to "None")
                )
            )

            call.respond(
                HttpStatusCode.OK,
            )
        }

        post("/naver") {
            /* ────── 0. 설정 값 ────── */
            val code = call.request.headers["X-Author-Code"]
                ?: throw UnauthorizedException(AuthErrorCode.NO_AUTHOR_CODE.toErrorCode())

            val cfg          = call.application.environment.config
            val tokenUri     = cfg.property("oauth.naver.token-uri").getString()
            val userUri      = cfg.property("oauth.naver.user-uri").getString()
            val clientId     = cfg.property("oauth.naver.client-id").getString()
            val clientSecret     = cfg.property("oauth.naver.client-secret").getString()


            /* ────── 1. access_token 요청 ────── */
            val tokenResponse = HttpClientProvider.client.submitForm(
                url = tokenUri,
                formParameters = Parameters.build {
                    append("grant_type", "authorization_code")
                    append("client_id", clientId)
                    append("client_secret", clientSecret)
                    append("code", code)
                }
            )
            if (!tokenResponse.status.isSuccess())
                throw UnauthorizedException(AuthErrorCode.INVALID_OAUTH_TOKEN.toErrorCode())

            val tokenInfo: NaverTokenResponse = tokenResponse.body()

            /* ────── 2. 사용자 정보 요청 ────── */
            val naverUser: NaverUserResponse = HttpClientProvider.client.get(userUri) {
                headers {
                    append(HttpHeaders.Authorization, "Bearer ${tokenInfo.access_token}")
                    append(HttpHeaders.Accept, "application/json")
                }
            }.body()

            val naverId       = naverUser.response.id
            val nickname      = naverUser.response.name

            println(naverUser)

            /* ────── 3. 회원 조회/생성 ────── */
            val userMetaDto = transaction {
                val mappingRow = OAuthUsers
                    .select(OAuthUsers.provider, OAuthUsers.providerUserId, OAuthUsers.userUuid)
                    .where {
                        (OAuthUsers.provider eq "NAVER") and
                                (OAuthUsers.providerUserId eq naverId)
                    }
                    .singleOrNull()

                val userEntity = if (mappingRow == null) {
                    val userPk = Users.insertAndGetId {
                        it[userId]       = "naver_${UUID.randomUUID().toString().take(8)}"
                        it[userPassword] = PasswordUtil.hashPassword(UUID.randomUUID().toString())
                        it[userName]     = nickname
                        it[loginType]    = "NAVER"
                    }.value

                    OAuthUsers.insert {
                        it[provider]       = "NAVER"
                        it[providerUserId] = naverId
                        it[userUuid]       = userPk
                    }

                    User.findById(userPk)
                } else {
                    User.findById(mappingRow[OAuthUsers.userUuid])
                } ?: throw NotFoundException(UserErrorCode.USER_NOT_FOUND.toErrorCode())

                UserMetaDto.from(userEntity)
            }

            /* ────── 4. JWT 발급 & 응답 ────── */
            val accessToken  = JwtUtil.generateToken(userMetaDto, "access")
            val refreshToken = JwtUtil.generateToken(userMetaDto, "refresh")

            call.response.headers.append("Authorization", "Bearer $accessToken")
            call.response.cookies.append(
                Cookie(
                    name     = "refresh_token",
                    value    = refreshToken,
                    httpOnly = true,
                    secure   = true,
                    path     = "/",
                    maxAge   = 60 * 60 * 24 * 31,
                    extensions = mapOf("SameSite" to "None")
                )
            )

            call.respond(
                HttpStatusCode.OK,
            )
        }

    }

}


