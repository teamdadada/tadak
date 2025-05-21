package com.tadak.presentation

import com.tadak.config.HttpClientProvider
import com.tadak.config.ProxyConfig
import com.tadak.config.proxyRequest
import com.tadak.util.JwtUtil
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.utils.io.*

fun Route.proxyRoutes(proxyConfig: ProxyConfig) {

    proxyConfig.rules.forEach { rule ->
        route(rule.pathPrefix+"{...}") {
            handle {
                val targetUri = "${rule.targetUrl}${call.request.uri}"

                val token = call.request.headers["Authorization"]?.removePrefix("Bearer ")
                val userMeta = token?.let { JwtUtil.verifyAndDecode(it) }

                call.proxyRequest(targetUri, userMeta)
            }
        }
    }

    route("{...}") {
        handle {
            val targetUri = "${proxyConfig.default}${call.request.uri}"

            val token = call.request.headers["Authorization"]?.removePrefix("Bearer ")
            val userMeta = token?.let { JwtUtil.verifyAndDecode(it) }

            call.proxyRequest(targetUri, userMeta)
        }
    }

}
