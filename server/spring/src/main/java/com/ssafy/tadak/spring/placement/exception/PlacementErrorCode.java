package com.ssafy.tadak.spring.placement.exception;

public enum PlacementErrorCode {
    PLACEMENT_FORBIDDEN("L4030", "접근할 수 없는 리소스입니다."),
    PLACEMENT_NOTFOUND("L4040", "배치 정보를 찾을 수 없습니다.");

    String errorcode;
    String message;

    private PlacementErrorCode(String errorcode, String message){
        this.errorcode = errorcode;
        this.message = message;
    }
}
