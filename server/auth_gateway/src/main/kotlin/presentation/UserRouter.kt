package com.tadak.presentation

import com.tadak.domain.entity.User
import com.tadak.domain.table.Users
import com.tadak.dto.AuthenticatedUserKey
import com.tadak.dto.SignUpRequest
import com.tadak.dto.response.SignUpResponse
import com.tadak.dto.response.UserSelectResponse
import com.tadak.exception.error_code.AuthErrorCode
import com.tadak.exception.error_code.UserErrorCode
import com.tadak.exception.status.BadRequestException
import com.tadak.exception.status.ConflictException
import com.tadak.exception.status.ForbiddenException
import com.tadak.exception.status.NotFoundException
import com.tadak.util.PasswordUtil
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

fun Route.userRoutes() {
    route("/user") {
        post("/signup") {
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
        get("/{id}") {
            val id = call.parameters["id"]?.toLongOrNull()?: throw BadRequestException(UserErrorCode.USER_BAD_REQUEST.toErrorCode())

            val user = transaction { User.findById(id) }
            user?.let {
                call.respond(UserSelectResponse.from(user))
            } ?: throw NotFoundException(UserErrorCode.USER_NOT_FOUND.toErrorCode())
        }

        get("/me") {
            val authUser = call.attributes.getOrNull(AuthenticatedUserKey)
                ?: throw BadRequestException(AuthErrorCode.UNAUTHORIZED_REQUEST.toErrorCode())

            val user = transaction { User.findById(authUser.userUuid) }
            user?.let {
                call.respond(UserSelectResponse.from(user))
            } ?: throw NotFoundException(UserErrorCode.USER_NOT_FOUND.toErrorCode())
        }
    }

}