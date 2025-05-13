package com.ssafy.tadak.spring.keyboard.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.keyboard.dto.request.CreateKeyboardRequest;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.service.KeyboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/keyboard")
@RequiredArgsConstructor
public class KeyboardController {
    private final KeyboardService keyboardService;

    @PostMapping
    public ResponseEntity<String> createKeyboard(
            @AuthUser UserInfo userInfo,
            @RequestBody CreateKeyboardRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                "\""+
                keyboardService.createKeyboard(
                        userInfo.id(),
                        request.name(),
                        request.thumbnailId(),
                        request.modelId(),
                        request.totalPrice(),
                        request.colors(),
                        request.options(),
                        request.bareboneId(),
                        request.switchId(),
                        request.keycapId()
                )
                + "\" 가 생성되었습니다."
        );
    }

    @GetMapping("/{keyboard-id}")
    public ResponseEntity<KeyboardDetailResponse> getKeyboardDetail(
            @AuthUser UserInfo userInfo,
            @PathVariable(name = "keyboard-id") Long keboardId
    ) throws Exception {
        return ResponseEntity.ok(
                keyboardService.getKeyboardDetail(userInfo.id(), keboardId)
        );

    }
}
