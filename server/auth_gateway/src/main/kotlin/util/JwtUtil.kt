package com.tadak.util

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.tadak.dto.UserMetaDto
import com.tadak.exception.error_code.AuthErrorCode
import com.tadak.exception.status.UnauthorizedException
import io.ktor.server.config.*
import java.util.*

object JwtUtil {
    private lateinit var secretKey: String
    private lateinit var issuer: String
    private lateinit var algorithm: Algorithm

    fun init(config: ApplicationConfig) {
        secretKey = config.property("ktor.jwt.secret").getString()
        issuer = config.property("ktor.jwt.issuer").getString()
        algorithm = Algorithm.HMAC256(secretKey)
    }

    fun generateToken(user: UserMetaDto, type: String): String {
        val now = System.currentTimeMillis()
        val expiresAt = when (type.lowercase()) {
            "access" -> Date(now + 1000 * 60 * 15)           // 15분
            "refresh" -> Date(now + 1000L * 60 * 60 * 24 * 31) // 31일
            else -> throw IllegalArgumentException("Unsupported token type: $type")
        }

        return JWT.create()
            .withIssuer(issuer)
            .withIssuedAt(Date(now))
            .withExpiresAt(expiresAt)
            .withClaim("userUuid", user.userUuid.toString())
            .withClaim("nickname", user.nickname)
            .withClaim("userType", user.userType)
            .sign(algorithm)
    }

    fun verifyAndDecode(token: String): UserMetaDto {
        return try {
            val verifier = JWT.require(algorithm)
                .withIssuer(issuer)
                .build()
            val decoded = verifier.verify(token)

            val userUuid = decoded.getClaim("userUuid").asString()?.toLongOrNull()
                ?: throw IllegalArgumentException("Invalid userUuid claim in token")
            val nickname = decoded.getClaim("nickname").asString() ?: "Unknown"
            val userType = decoded.getClaim("userType").asString() ?: "USER"

            UserMetaDto(
                userUuid = userUuid,
                nickname = nickname,
                userType = userType
            )
        } catch (e: Exception) {
            throw UnauthorizedException(AuthErrorCode.INVALID_JWT_TOKEN.toErrorCode())
        }
    }
}