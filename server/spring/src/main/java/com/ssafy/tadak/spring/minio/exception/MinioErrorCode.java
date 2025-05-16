package com.ssafy.tadak.spring.minio.exception;

public enum MinioErrorCode {

    NOT_ALLOWED_TYPE("M4000", "허용되지 않은 파일 형식입니다."),
    FILE_NOTFOUND("M4040", "파일을 찾을 수 없습니다."),
    BUCKET_NOTFOUND("M4041","버킷을 찾을 수 없습니다."),
    UPLOAD_FAILED("S5001", "업로드 중 서버 오류가 발생했습니다.");
    String errorcode;
    String message;

    private MinioErrorCode(String errorcode, String message){
        this.errorcode = errorcode;
        this.message = message;
    }
}
