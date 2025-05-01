package com.tadak.config

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*

object HttpClientProvider {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json()
        }
        expectSuccess = false
    }
}