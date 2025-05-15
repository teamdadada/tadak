package com.tadak.domain.table

import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.javatime.datetime

object Users : LongIdTable("users", "user_uuid") {
    val userId = varchar("user_id", 50)
    val userPassword = varchar("user_password", 255)
    val userName = varchar("user_name", 30)
    val profileImg = varchar("profile_img", 255)
    val createdAt = datetime("created_at")
    val updatedAt = datetime("updated_at")
    val userType = varchar("user_type", 10)
    val loginType = varchar("login_type", 20)
}
