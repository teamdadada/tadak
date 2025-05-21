package com.tadak.config

//class ProxyConfig(config: ApplicationConfig) {
//    val springBaseUrl: String = config.property("ktor.proxy.spring").getString()
//    val fastapiBaseUrl: String = config.property("ktor.proxy.fastapi").getString()
//}

data class ProxyConfig(
    val default: String,
    val rules: List<ProxyRule>
) {
    data class ProxyRule(
        val pathPrefix: String,
        val targetUrl: String
    )
}