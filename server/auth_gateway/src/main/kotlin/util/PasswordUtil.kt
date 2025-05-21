package com.tadak.util

import org.mindrot.jbcrypt.BCrypt

object PasswordUtil {
    fun hashPassword(plain: String): String =
        BCrypt.hashpw(plain, BCrypt.gensalt())

    fun verify(plain: String, hashed: String): Boolean =
        BCrypt.checkpw(plain, hashed)
}