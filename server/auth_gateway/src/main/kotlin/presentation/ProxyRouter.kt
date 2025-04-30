package com.tadak.presentation

import com.tadak.config.HttpClientProvider
import com.tadak.config.ProxyConfig
import com.tadak.util.JwtUtil
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.utils.io.*

fun Route.proxyRoutes(env: ApplicationEnvironment) {
    val proxyConfig = ProxyConfig(env.config)

    route("{...}") {
        handle {
            val targetUri = proxyConfig.springBaseUrl + call.request.uri
            val method = call.request.httpMethod

            val token = call.request.headers["Authorization"]?.removePrefix("Bearer ")
            val userMeta = token?.let { JwtUtil.verifyAndDecode(it) }

            val requestBytes = call.receiveChannel().toByteArray()

            val clientResponse = HttpClientProvider.client.request(targetUri) {
                this.method = method
                headers.appendAll(call.request.headers)
                headers.remove(HttpHeaders.Host)
                userMeta?.let {
                    headers.append("X-User-Id", it.userUuid.toString())
                    headers.append("X-User-Nickname", it.nickname)
                    headers.append("X-User-Type", it.userType)
                }
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
