package com.tadak.config

import com.tadak.dto.UserMetaDto
import io.ktor.client.call.body
import io.ktor.client.request.request
import io.ktor.client.request.setBody
import io.ktor.http.HttpHeaders
import io.ktor.http.contentType
import io.ktor.http.headers
import io.ktor.server.application.ApplicationCall
import io.ktor.server.config.ApplicationConfig
import io.ktor.server.request.httpMethod
import io.ktor.server.response.respondBytes
import io.ktor.utils.io.ByteReadChannel
import io.ktor.utils.io.toByteArray

fun ApplicationConfig.proxyConfig(): ProxyConfig {
    val defaultTarget = property("ktor.proxy.default").getString() // ← 이렇게!
    val rules = configList("ktor.proxy.rules").map {
        ProxyConfig.ProxyRule(
            pathPrefix = it.property("pathPrefix").getString(),
            targetUrl = it.property("targetUrl").getString()
        )
    }
    return ProxyConfig(defaultTarget, rules)
}

suspend fun ApplicationCall.proxyRequest(
    targetUrl: String,
    userMeta: UserMetaDto? // JWT에서 파싱한 사용자 메타데이터
) {
    val clientResponse = HttpClientProvider.client.request(targetUrl) {
        method = request.httpMethod
        headers.appendAll(request.headers)
        headers.remove(HttpHeaders.Host)
        userMeta?.let {
            headers.append("X-User-Id", it.userUuid.toString())
            headers.append("X-User-Nickname", it.nickname)
            headers.append("X-User-Type", it.userType)
        }
        setBody(request.receiveChannel().toByteArray())
    }

    respondBytes(
        bytes = clientResponse.body<ByteReadChannel>().toByteArray(),
        status = clientResponse.status,
        contentType = clientResponse.contentType()
    )
}