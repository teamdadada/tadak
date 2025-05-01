package com.tadak.config

import com.tadak.dto.AuthenticatedUser
import com.tadak.dto.AuthenticatedUserKey
import com.tadak.util.JwtUtil
import io.ktor.server.application.*

fun Application.configureAuthInterceptor(jwtUtil: JwtUtil) {
    intercept(ApplicationCallPipeline.Plugins) {
        val token = call.request.headers["Authorization"]?.removePrefix("Bearer ")

        if (token != null) {
            val decoded = jwtUtil.verifyAndDecode(token) // JWT 디코딩
            val user = AuthenticatedUser(
                userUuid = decoded.userUuid,
            )
            call.attributes.put(AuthenticatedUserKey, user)
        }
    }
}