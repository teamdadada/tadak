package com.ssafy.tadak.spring.keyboard.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.keyboard.dto.request.CreateKeyboardRequest;
import com.ssafy.tadak.spring.keyboard.service.KeyboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/keyboard")
@RequiredArgsConstructor
public class KeyboardController {
    private final KeyboardService keyboardService;

    @PostMapping
    public ResponseEntity<String> createKeyboard(
            @AuthUser UserInfo userInfo,
            @ModelAttribute CreateKeyboardRequest request
    ) {
        return ResponseEntity.ok(
                "\""+
                keyboardService.createKeyboard(
                        userInfo.id(),
                        request.keyboardName(),
                        request.keyboardImage(),
                        request.keyboardPrice(),
                        request.keyboardColor(),
                        request.partOptionIdList()
                )
                + "\" 가 생성되었습니다."
        );
    }
}
