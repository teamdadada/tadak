package com.ssafy.tadak.spring.zzim.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.zzim.dto.response.ZzimCntResponse;
import com.ssafy.tadak.spring.zzim.dto.response.ZzimListResponse;
import com.ssafy.tadak.spring.zzim.service.ZzimService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/zzim")
public class ZzimController {

    private final ZzimService zzimService;

    @PostMapping("/{product_id}")
    public ResponseEntity<Void> zzim(
            @PathVariable("product_id") Long productId,
            @AuthUser UserInfo userInfo
    ) {
        zzimService.addZzim(userInfo, productId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{product_id}")
    public ResponseEntity<Void> deleteZzim(
            @PathVariable("product_id") Long productId,
            @AuthUser UserInfo userInfo
    ) {
        zzimService.deleteZzim(userInfo, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cnt")
    public ResponseEntity<ZzimCntResponse> getZzimCnt(@AuthUser UserInfo userInfo) {
        return ResponseEntity.ok(zzimService.getZzimMeta(userInfo));
    }

    @GetMapping("/list")
    public ResponseEntity<ZzimListResponse> getZzimList(@AuthUser UserInfo userInfo) {
        ZzimListResponse result = zzimService.getZzimsByUserId(userInfo);
        return ResponseEntity.ok(result);
    }
}
