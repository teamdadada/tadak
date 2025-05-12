package com.tadak.presentation

import com.tadak.application.ImageUploadService
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
import com.tadak.exception.status.UnauthorizedException
import com.tadak.util.PasswordUtil
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.LocalDateTime

fun Route.userRoutes() {
    route("/user") {
        post("/signup") {
            val request = call.receive<SignUpRequest>()

            val user = transaction {
                User.find { Users.userId eq request.userId }.singleOrNull()
            }

            if (user != null) {
                throw ConflictException(UserErrorCode.DUPLICATE_USER_ID.toErrorCode())
            }

            val hashedPassword = PasswordUtil.hashPassword(request.password)

            transaction {
                Users.insert {
                    it[userId] = request.userId
                    it[userPassword] = hashedPassword
                    it[userName] = request.nickname
                    it[loginType] = "TADAK"
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

        post("/img") {
            val authUser = call.attributes.getOrNull(AuthenticatedUserKey)
                ?: throw BadRequestException(AuthErrorCode.UNAUTHORIZED_REQUEST.toErrorCode())

            val multipart = call.receiveMultipart()
            val filePart = multipart.readPart() as? PartData.FileItem
                ?: throw BadRequestException(UserErrorCode.USER_BAD_REQUEST.toErrorCode())

            val imageUrl = ImageUploadService.uploadImage(filePart)

            transaction {
                val user = User.find { Users.id eq authUser.userUuid }.singleOrNull()
                    ?: throw NotFoundException(UserErrorCode.USER_NOT_FOUND.toErrorCode())
                user.profileImg = imageUrl
                user.updatedAt = LocalDateTime.now()
            }

            call.response.headers.append(HttpHeaders.Location, imageUrl)
            call.respond(HttpStatusCode.Created)
        }
    }

}