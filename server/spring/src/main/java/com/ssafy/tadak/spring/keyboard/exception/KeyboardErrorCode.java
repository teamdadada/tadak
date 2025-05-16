package com.ssafy.tadak.spring.keyboard.exception;

public enum KeyboardErrorCode {

    BADREQUEST("K4000", "요청 파라미터가 잘못되었습니다."),
    UNAUTHORIZED("K4010", "로그인이 필요한 서비스입니다."),
    KEYBOARD_FORBIDDEN("K4030", "키보드 제작자만 접근할 수 있습니다."),
    KEYBOARD_NOTFOUND("K4040", "키보드를 찾을 수 없습니다."),
    CATEGORY_NOTFOUND("K4041", "부품 카테고리를 찾을 수 없습니다."),
    PART_OPTION_NOTFOUND("K4042", "부품을 찾을 수 없습니다."),
    PART_OPTION_CONFLICT("K409", "부품 수량이 부족합니다.");

    String errorcode;
    String message;

    private KeyboardErrorCode(String errorcode, String message){
        this.errorcode = errorcode;
        this.message = message;
    }
}
