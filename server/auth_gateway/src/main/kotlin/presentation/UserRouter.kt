package com.tadak.presentation

import com.tadak.domain.table.Users
import com.tadak.dto.SignUpRequest
import com.tadak.dto.response.SignUpResponse
import com.tadak.exception.error_code.AuthErrorCode
import com.tadak.exception.error_code.UserErrorCode
import com.tadak.exception.status.ConflictException
import com.tadak.exception.status.ForbiddenException
import com.tadak.util.PasswordUtil
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

fun Route.userRoutes() {
    route("{...}") {
        handle {
            val request = call.receive<SignUpRequest>()

            val userExists = transaction {
                Users.select(Users.userId eq request.userId).count() > 0
            }

            if (userExists) {
                throw ConflictException(UserErrorCode.DUPLICATE_USER_ID.toErrorCode())
            }

            val hashedPassword = PasswordUtil.hashPassword(request.password)

            transaction {
                Users.insert {
                    it[userId] = request.userId
                    it[userPassword] = hashedPassword
                    it[userName] = request.nickname
                }
            }

            call.respond(HttpStatusCode.Created)
        }
    }

}