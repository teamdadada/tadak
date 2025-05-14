package com.ssafy.tadak.spring.keyboard.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.keyboard.dto.request.CreateKeyboardRequest;
import com.ssafy.tadak.spring.keyboard.dto.response.GetOptionsResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetProductListResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardCreateResponse;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/keyboard")
@RequiredArgsConstructor
public class KeyboardController {
    private final KeyboardService keyboardService;

    @PostMapping
    public ResponseEntity<KeyboardCreateResponse> createKeyboard(
            @AuthUser UserInfo userInfo,
            @RequestBody CreateKeyboardRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
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

    @GetMapping("/option")
    public ResponseEntity<GetOptionsResponse> getKeyboardOption(){
        return ResponseEntity.ok(keyboardService.getAllOptions());
    }

    @GetMapping("/keycap")
    public ResponseEntity<GetProductListResponse> getKeycap(){
        return ResponseEntity.ok(
                keyboardService.getKeycapList()
        );
    }

    //todo: 옵션 null인 경우 있는지?
    @GetMapping("/barebone")
    public ResponseEntity<GetProductListResponse> getBarebone(
            @RequestParam(name = "layout") Long layout,
            @RequestParam(name = "material") Long material
    ){
        return ResponseEntity.ok(
                keyboardService.getBareboneList(layout,material)
        );
    }

    @GetMapping("/switch")
    public ResponseEntity<GetProductListResponse> getSwitch(
            @RequestParam(name = "type") Long type
    ){
        return ResponseEntity.ok(
                keyboardService.getSwitchList(type)
        );
    }
}
