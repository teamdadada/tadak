package com.ssafy.tadak.spring.minio.service;

import com.ssafy.tadak.spring.minio.domain.entity.Bucket;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.BucketJpaRepository;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.dto.response.UploadResponse;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MinioService {
    private final int URL_EXPIRE = 600;

    private final MinioUtil minioUtil;
    private final BucketJpaRepository bucketJpaRepository;
    private final ImageJpaRepository imageJpaRepository;

    public void checkAndCreateBucket(String bucketName) throws Exception {
        boolean isExist = minioUtil.checkBucket(bucketName);
        if(!isExist) {
            minioUtil.createBucket(bucketName);
            bucketJpaRepository.save(
                    Bucket.builder()
                            .name(bucketName)
                            .isPublic(false)
                            .build()
            );
        }
    }

    public UploadResponse uploadFile(
            MultipartFile file,
            String bucketName
    ) throws Exception {
        Bucket bucket = bucketJpaRepository.findByName(bucketName)
                .orElseThrow(() -> new RuntimeException("버킷을 찾을 수 없습니다."));

        String fileName = "uploads/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        try {
            String imageUrl = minioUtil.uploadFile(fileName, file, bucket);
            Image newImage = imageJpaRepository.save(
                                new Image(bucket, fileName)
                        );
            return new UploadResponse(newImage.getId(), imageUrl);
        } catch (Exception e) {
            throw new RuntimeException("업로드 실패: "+e.getMessage());
        }
    }

    public String deleteFile(Long imageId) throws Exception {
        Image image = imageJpaRepository.findById(imageId)
                .orElseThrow(()->new RuntimeException("이미지를 찾을 수 없습니다."));

        try {
            String fileName = image.getFilePath();
            minioUtil.deleteFile(fileName, image.getBucket().getName());
            imageJpaRepository.delete(image);
            return "삭제 완료: " + fileName;
        } catch (Exception e) {
            throw new RuntimeException("삭제 실패: "+e.getMessage());
        }
    }

    public String getPresignedUrl(String bucketName, String fileName) throws Exception {
        try {
            return  minioUtil.getPresignedUrl(bucketName, fileName, URL_EXPIRE);
        } catch (Exception e) {
            throw new RuntimeException("URL 생성 실패: " + e.getMessage());
        }
    }
}
