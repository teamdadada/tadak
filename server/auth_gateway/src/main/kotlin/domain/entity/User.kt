package com.tadak.domain.entity

import com.tadak.domain.table.Users
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class User(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<User>(Users)

    var userId by Users.userId
    var userPassword by Users.userPassword
    var userName by Users.userName
    var profileImg by Users.profileImg
    var createdAt by Users.createdAt
    var updatedAt by Users.updatedAt
    var userType by Users.userType
    var loginType by Users.loginType
}