package com.tadak.domain

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object Users : Table("user") {
    val userUuid = varchar("user_uuid", 36)
    val userId = varchar("user_id", 50)
    val userPassword = varchar("user_password", 255)
    val userName = varchar("user_name", 30)
    val profileImg = varchar("profile_img", 255)
    val createdAt = datetime("created_at")
    val updatedAt = datetime("updated_at")
    val userType = varchar("user_type", 10)

    override val primaryKey = PrimaryKey(userUuid)
}
