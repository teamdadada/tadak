package com.tadak.presentation

import com.tadak.domain.Users
import com.tadak.dto.SignUpRequest
import com.tadak.dto.response.SignUpResponse
import com.tadak.exception.ErrorCode
import com.tadak.exception.GlobalException
import com.tadak.util.PasswordUtil
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

import java.util.*

fun Route.authRoutes() {
    route("/") {
        post("/signup") {
            val request = call.receive<SignUpRequest>()

            val userExists = transaction {
                Users.select(Users.userId eq request.userId).count() > 0
            }

            if (userExists) {
                call.response.status(HttpStatusCode.Conflict)
                call.respond(SignUpResponse("이미 존재하는 아이디입니다."))
                return@post
            }

            val hashedPassword = PasswordUtil.hashPassword(request.password)

            transaction {
                Users.insert {
                    it[userId] = request.userId
                    it[userPassword] = hashedPassword
                    it[userName] = request.name
                }
            }

            call.respond(HttpStatusCode.Created, "회원가입 성공")
        }

        get("/") {
            throw GlobalException(ErrorCode(code="T4000", message = "오류발생"), HttpStatusCode.BadRequest)
        }
    }

}