package com.ssafy.tadak.spring.minio.exception;

public enum MinioErrorCode {

    BADREQUEST("M4000", "잘못된 요청입니다."),
    FILE_NOTFOUND("M4040", "파일을 찾을 수 없습니다.");
    String errorcode;
    String message;

    private MinioErrorCode(String errorcode, String message){
        this.errorcode = errorcode;
        this.message = message;
    }
}
