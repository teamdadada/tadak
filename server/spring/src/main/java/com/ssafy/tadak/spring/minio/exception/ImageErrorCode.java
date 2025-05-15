package com.ssafy.tadak.spring.minio.exception;

public enum ImageErrorCode {

    BADREQUEST("I4000", "잘못된 요청입니다."),
    IMAGE_NOTFOUND("I4040", "파일을 찾을 수 없습니다.");
    String errorcode;
    String message;

    private ImageErrorCode(String errorcode, String message){
        this.errorcode = errorcode;
        this.message = message;
    }
}
