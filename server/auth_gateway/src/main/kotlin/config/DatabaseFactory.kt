package com.tadak.config

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database

object DatabaseFactory {
    fun init(env: ApplicationEnvironment) {
        Database.connect(hikari(env))
    }

    private fun hikari(env: ApplicationEnvironment): HikariDataSource {
        val config = HikariConfig().apply {
            jdbcUrl = env.config.property("ktor.datasource.jdbcUrl").getString()
            driverClassName = env.config.property("ktor.datasource.driver").getString()
            username = env.config.property("ktor.datasource.username").getString()
            password = env.config.property("ktor.datasource.password").getString()
            maximumPoolSize = env.config.property("ktor.datasource.maximumPoolSize").getString().toInt()
            transactionIsolation = env.config.property("ktor.datasource.transactionIsolation").getString()
            isAutoCommit = false
            validate()
        }
        return HikariDataSource(config)
    }
}
