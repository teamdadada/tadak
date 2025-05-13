package com.tadak.application

import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.config.*
import io.ktor.utils.io.*
import io.ktor.utils.io.core.*
import io.minio.BucketExistsArgs
import io.minio.MakeBucketArgs
import io.minio.MinioClient
import io.minio.PutObjectArgs
import kotlinx.io.readByteArray
import java.util.*

object ImageUploadService {

    private const val BUCKET_NAME = "profile"
    private const val BASE_URL = "https://minio.tadak.kr"

    private val minioClient: MinioClient = MinioClient.builder()
        .endpoint("https://minio.tadak.kr")
        .credentials("dadada", "dadada!!")
        .build()

    suspend fun uploadImage(fileItem: PartData.FileItem): String {
        println(fileItem.contentType)
        val extension = fileItem.contentType?.toExtension()
            ?: throw IllegalArgumentException("Unsupported content type")
        val newFileName = "profile_image_${UUID.randomUUID()}.$extension"

        val channel = fileItem.provider()
        val bytes = channel.readRemaining().readByteArray()
        val inputStream = bytes.inputStream()
        val contentType = fileItem.contentType?.toString() ?: "application/octet-stream"

        val exists = minioClient.bucketExists(
            BucketExistsArgs.builder().bucket(BUCKET_NAME).build()
        )
        if (!exists) {
            minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(BUCKET_NAME).build()
            )
        }

        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(BUCKET_NAME)
                .`object`(newFileName)
                .stream(inputStream, bytes.size.toLong(), -1)
                .contentType(contentType)
                .build()
        )

        return "$BASE_URL/$BUCKET_NAME/$newFileName"
    }

    private fun ContentType.toExtension(): String? {
        return when (this) {
            ContentType.Image.JPEG -> "jpg"
            ContentType.Image.PNG -> "png"
            ContentType.Image.GIF -> "gif"
            else -> null
        }
    }
}