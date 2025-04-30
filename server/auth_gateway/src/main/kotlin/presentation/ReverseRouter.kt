package com.tadak.presentation

import com.tadak.config.HttpClientProvider
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.utils.io.*

fun Route.proxyRoutes() {
    route("/reverse") {
        get("/") {
            val targetUri = "http://td-spring-dev" + call.request.uri
            val method = call.request.httpMethod

            val requestBytes = call.receiveChannel().toByteArray()

            val clientResponse = HttpClientProvider.client.request(targetUri) {
                this.method = method
                headers.appendAll(call.request.headers)
                setBody(requestBytes)
            }

            val responseBytes = clientResponse.body<ByteReadChannel>().toByteArray()

            call.respondBytes(
                bytes = responseBytes,
                status = clientResponse.status,
                contentType = clientResponse.contentType()
            )
        }
    }
}
