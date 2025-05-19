package com.ssafy.tadak.spring.keyboard.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.keyboard.dto.request.CreateKeyboardRequest;
import com.ssafy.tadak.spring.keyboard.dto.request.UpdateKeyboardProductRequest;
import com.ssafy.tadak.spring.keyboard.dto.request.UpdateKeyboardRequest;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardListResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardModelResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetOptionsResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetProductListResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.KeyboardCreateResponse;
import com.ssafy.tadak.spring.keyboard.dto.response.GetKeyboardDetailResponse;
import com.ssafy.tadak.spring.keyboard.service.KeyboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<GetKeyboardListResponse>> getKeyboardList(
            @AuthUser UserInfo userInfo
    ) {
        return ResponseEntity.ok(
                keyboardService.getKeyboardList(userInfo.id())
        );
    }

    @GetMapping("/{keyboard-id}")
    public ResponseEntity<GetKeyboardDetailResponse> getKeyboardDetail(
            @AuthUser UserInfo userInfo,
            @PathVariable(name = "keyboard-id") Long keboardId
    ) throws Exception {
        return ResponseEntity.ok(
                keyboardService.getKeyboardDetail(userInfo.id(), keboardId)
        );
    }

    @GetMapping("/{keyboard-id}/model")
    public ResponseEntity<GetKeyboardModelResponse> getKeyboardModel(
            @AuthUser UserInfo userInfo,
            @PathVariable(name = "keyboard-id") Long keboardId
    ){
        return ResponseEntity.ok(
                keyboardService.getKeyboardModel(userInfo.id(), keboardId)
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

    //옵션 null인 경우 없음
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

    @PatchMapping("/{keyboard-id}")
    public ResponseEntity<Void> updateKeyboard(
            @AuthUser UserInfo userinfo,
            @PathVariable(name = "keyboard-id") Long keyboardId,
            @RequestBody UpdateKeyboardRequest request
    ) throws Exception {
        keyboardService.updateKeyboard(
                userinfo.id(),
                keyboardId,
                request.name(),
                request.thumbnailId(),
                request.modelId(),
                request.totalPrice(),
                request.colors(),
                request.options(),
                request.bareboneId(),
                request.switchId(),
                request.keycapId()
        );
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{keyboard-id}/product")
    public ResponseEntity<Void> updateKeyboardProduct(
            @AuthUser UserInfo userInfo,
            @PathVariable(name = "keyboard-id") Long keyboardId,
            @RequestBody UpdateKeyboardProductRequest request
    ){
       keyboardService.updateKeyboardProduct(
               userInfo.id(),
               keyboardId,
               request.bareboneId(),
               request.keycapId(),
               request.switchId()
       );
       return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{keyboard-id}")
    public ResponseEntity<Void> deleteKeyboard(
            @AuthUser UserInfo userInfo,
            @PathVariable(name = "keyboard-id") Long keyboardId
    ) throws Exception {
        keyboardService.deleteKeyboard(userInfo.id(), keyboardId);
        return ResponseEntity.ok().build();
    }
}
