package com.tadak.domain.table

import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object OAuthUsers : Table("oauth_users") {
    val provider = varchar("provider", 20)
    val providerUserId = varchar("provider_user_id", 255)
    val userUuid = long("user_uuid")

    override val primaryKey = PrimaryKey(provider, providerUserId, name = "PK_OAuthUsers")
}
