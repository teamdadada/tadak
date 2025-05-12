package com.ssafy.tadak.spring.minio.controller;

import com.ssafy.tadak.spring.minio.service.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class MinioController {
    private final MinioService minioService;

    @PostMapping("/{bucket-name}")
    public ResponseEntity<String> uploadImage(
            @RequestParam(required = true, name = "file") MultipartFile file,
            @PathVariable(name = "bucket-name") String bucketName
    ) {
        try{
            return ResponseEntity.ok("업로드 완료: "+
                    minioService.uploadFile(file, bucketName)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/{image-id}")
    public ResponseEntity<String> deleteImage(
            @PathVariable(required = true, name = "image-id") Long imageId
    ) {
        try{
            return ResponseEntity.ok("삭제 완료: "+
                    minioService.deleteFile(imageId)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("bucket/{create}")
    public ResponseEntity<String> createBucket(@PathVariable(name = "create") String bucketName) throws Exception {
        minioService.checkAndCreateBucket(bucketName);
        return ResponseEntity.ok("버킷 생성: "+bucketName);
    }
}
