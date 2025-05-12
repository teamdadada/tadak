package com.ssafy.tadak.spring.minio.util;

import io.minio.BucketExistsArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.RemoveObjectsArgs;
import io.minio.StatObjectArgs;
import io.minio.http.Method;
import io.minio.messages.DeleteObject;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MinioUtil {
    private final MinioClient minioClient;

    @Value("${minio.public-bucket}")
    private String publicBucket;

    @Value("${minio.private-bucket}")
    private String privateBucket;

    /** 버킷이 존재하는지 확인 후 없으면 생성 **/
    public void checkAndCreateBucket(String bucket) throws Exception {
        boolean isExist = minioClient.bucketExists(
                BucketExistsArgs.builder().bucket(bucket).build()
        );

        if(!isExist) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder().bucket(bucket).build()
            );
        }
    }

    /** 파일 업로드 **/
    public void uploadFile(
            String fileName,
            MultipartFile file,
            boolean isPublic
    ) throws Exception {
        String bucket = isPublic ? publicBucket : privateBucket;

        InputStream input = null;
        try{
            input = file.getInputStream();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .stream(input, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
        }finally {
            if (input != null) {
                input.close();
            }
        }
    }

    /** presigned URL 발급 (GET) **/
    public String getPresignedUrl(String objectName, int expiresInSeconds) throws Exception {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(privateBucket)
                        .object(objectName)
                        .method(Method.GET)
                        .expiry(expiresInSeconds, TimeUnit.SECONDS)
                        .build()
        );
    }

    /** 파일 삭제 **/
    public void deleteFile(String fileName, boolean isPublic) throws Exception{
        String bucket = isPublic ? publicBucket : privateBucket;

        minioClient.statObject(
                StatObjectArgs.builder()
                        .bucket(bucket)
                        .object(fileName)
                        .build()
        );

        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucket)
                        .object(fileName)
                        .build()
        );
    }

    /** 파일 여러개 삭제 **/
    public void deleteFiles(List<String> fileNames, boolean isPublic) throws Exception{
        String bucket = isPublic ? publicBucket : privateBucket;

        List<DeleteObject> objects = fileNames.stream()
                .map(DeleteObject::new)
                .toList();

        minioClient.removeObjects(
                RemoveObjectsArgs.builder()
                        .bucket(bucket)
                        .objects(objects)
                        .build()
        );
    }
}
