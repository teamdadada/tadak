package com.tadak

import com.tadak.config.DatabaseFactory
import com.tadak.config.configureAuthInterceptor
import com.tadak.config.configureRouting
import com.tadak.exception.configureExceptionHandler
import com.tadak.util.JwtUtil
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*


fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
    configureRouting()
    DatabaseFactory.init(environment)
    JwtUtil.init(environment.config)
    configureAuthInterceptor(JwtUtil)
    configureExceptionHandler()

}
