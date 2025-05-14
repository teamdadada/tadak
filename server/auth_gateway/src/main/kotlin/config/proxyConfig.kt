package com.tadak.config

import io.ktor.server.application.*
import io.ktor.server.config.*

class ProxyConfig(config: ApplicationConfig) {
    val springBaseUrl: String = config.property("ktor.proxy.spring").getString()
    val fastapiBaseUrl: String = config.property("ktor.proxy.fastapi").getString()
}