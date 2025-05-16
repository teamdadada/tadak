package com.ssafy.tadak.spring.minio.service;

import com.ssafy.tadak.spring.minio.domain.entity.Bucket;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.BucketJpaRepository;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.dto.response.UploadResponse;
import com.ssafy.tadak.spring.minio.exception.ImageException;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.UUID;

import static com.ssafy.tadak.spring.minio.exception.ImageErrorCode.IMAGE_NOTFOUND;
import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MinioService {
    private final int URL_EXPIRE = 600;
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "model/gltf+json",   // glTF
            "model/gltf-binary", // .glb
            "model/obj",         // .obj
            "model/fbx"         // .fbx (일부 브라우저에서 octet-stream으로 올라올 수도 있음)
    );

    private final MinioUtil minioUtil;
    private final BucketJpaRepository bucketJpaRepository;
    private final ImageJpaRepository imageJpaRepository;

    @Transactional
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

    @Transactional
    public UploadResponse uploadFile(
            MultipartFile file,
            String bucketName
    ) {
        String contentType = file.getContentType();
        String fileName = "uploads/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        if(!isAllowedFile(contentType, fileName)) {
            throw new MinioException.MinioBadRequestException(NOT_ALLOWED_TYPE);
        }

        Bucket bucket = bucketJpaRepository.findByName(bucketName)
                .orElseThrow(() -> new MinioException.MinioNotFoundException(BUCKET_NOTFOUND));

        try {
            String imageUrl = minioUtil.uploadFile(fileName, file, bucket);
            Image newImage = imageJpaRepository.save(
                                new Image(bucket, fileName)
                        );
            return new UploadResponse(newImage.getId(), imageUrl);
        } catch (Exception e) {
            throw new MinioException.MinioBadRequestException(UPLOAD_FAILED);
        }
    }

    @Transactional
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

    public String getPublicUrl(Long imageId) throws Exception {
        Image image = imageJpaRepository.findById(imageId)
                .orElseThrow(()->new ImageException.ImageNotFoundException(IMAGE_NOTFOUND));

        return minioUtil.getPublicUrl(image.getBucket(), image.getFilePath());
    }

    public String getPresignedUrl(String bucketName, String fileName) throws Exception {
        try {
            return  minioUtil.getPresignedUrl(bucketName, fileName, URL_EXPIRE);
        } catch (Exception e) {
            throw new RuntimeException("URL 생성 실패: " + e.getMessage());
        }
    }

private boolean isAllowedFile(String contentType, String fileName){
    if(ALLOWED_CONTENT_TYPES.contains(contentType)) {
        return true;
    }

    if (contentType.equals("application/octet-stream") && fileName != null) {
        String lower = fileName.toLowerCase();
        return lower.endsWith(".glb") || lower.endsWith(".obj") || lower.endsWith(".fbx");
    }

    return false;
    }
}
