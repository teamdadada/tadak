package com.ssafy.tadak.spring.minio.util;

import com.ssafy.tadak.spring.minio.domain.entity.Bucket;
import com.ssafy.tadak.spring.minio.domain.repository.BucketJpaRepository;
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

    @Value("${minio.endpoint}")
    private String endpoint;

    /** 버킷이 존재하는지 확인 **/
    public boolean checkBucket(String bucket) throws Exception {
        return minioClient.bucketExists(
                BucketExistsArgs.builder().bucket(bucket).build()
        );
    }

    /** 버킷 생성 **/
    public void createBucket(String bucket) throws Exception {
        minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(bucket).build()
        );
    }

    /** 파일 업로드 **/
    public String uploadFile(
            String fileName,
            MultipartFile file,
            Bucket bucket
    ) throws Exception {

        InputStream input = null;
        try{
            input = file.getInputStream();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket.getName())
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
        return getImageUrl(bucket, fileName);
    }

    public String getPublicUrl(Bucket bucket, String fileName){
        return String.format("%s/%s/%s", endpoint, bucket.getName(), fileName);
    }

    public String getImageUrl(Bucket bucket, String fileName) throws Exception {
        if(bucket.getIsPublic()) {
            return String.format("%s/%s/%s", endpoint, bucket.getName(), fileName);
        }else{
            return getPresignedUrl(bucket.getName(), fileName, 600);
        }
    }

    /** presigned URL 발급 (GET) **/
    public String getPresignedUrl(String bucketName, String objectName, int expiresInSeconds) throws Exception {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .method(Method.GET)
                        .expiry(expiresInSeconds, TimeUnit.SECONDS)
                        .build()
        );
    }

    /** 파일 삭제 **/
    public void deleteFile(
            String fileName,
            String bucket
    ) throws Exception{

        //파일이 존재하는지 확인
        minioClient.statObject(
                StatObjectArgs.builder()
                        .bucket(bucket)
                        .object(fileName)
                        .build()
        );
        //파일 삭제
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucket)
                        .object(fileName)
                        .build()
        );
    }

    /** 파일 여러개 삭제 **/
    public void deleteFiles(
            List<String> fileNames,
            String bucket
    ) throws Exception{

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
