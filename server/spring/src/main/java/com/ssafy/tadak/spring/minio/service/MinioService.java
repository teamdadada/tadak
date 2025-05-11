package com.ssafy.tadak.spring.minio.service;

import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MinioService {
    private final int URL_EXPIRE = 3600;

    private final MinioUtil minioUtil;

    public String uploadFile(MultipartFile file) throws Exception {
        String fileName = "uploads/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            minioUtil.uploadFile(fileName, file);
            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("업로드 실패: "+e.getMessage());
        }
    }

    public String deleteFile(String fileName) throws Exception {
        try {
            minioUtil.deleteFile(fileName);
            return "삭제 완료: " + fileName;
        } catch (Exception e) {
            throw new RuntimeException("삭제 실패: "+e.getMessage());
        }
    }

    public String getPresignedUrl(String fileName) throws Exception {
        try {
            return  minioUtil.getPresignedUrl(fileName, URL_EXPIRE);
        } catch (Exception e) {
            throw new RuntimeException("URL 생성 실패: " + e.getMessage());
        }
    }
}
