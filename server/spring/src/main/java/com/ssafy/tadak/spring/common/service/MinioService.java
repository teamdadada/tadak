package com.ssafy.tadak.spring.common.service;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MinioService {
    private final MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucket;

    /** 버킷이 존재하는지 확인 후 없으면 생성하는 메소드입니다.
     * **/
    public void checkAndCreateBucket() throws Exception {
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
    public void uploadFile(String fileName, MultipartFile file) throws Exception {
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


}
