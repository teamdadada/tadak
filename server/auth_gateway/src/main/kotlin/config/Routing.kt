package com.tadak.config

import com.tadak.presentation.authRoutes
import com.tadak.presentation.userRoutes
import com.tadak.presentation.proxyRoutes
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val proxyConfig = environment.config.proxyConfig()

    routing {
        authRoutes()
        userRoutes()
        proxyRoutes(proxyConfig)
    }
}
