package com.tadak.config

import com.tadak.presentation.authRoutes
import com.tadak.presentation.userRoutes
import com.tadak.presentation.proxyRoutes
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        authRoutes()
        userRoutes()
        proxyRoutes(environment)
    }
}
