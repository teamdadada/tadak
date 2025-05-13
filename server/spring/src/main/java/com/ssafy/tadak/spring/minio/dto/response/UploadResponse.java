package com.ssafy.tadak.spring.minio.dto.response;

public record UploadResponse (
        Long imageId,
        String url
){
}
