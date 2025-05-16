package com.ssafy.tadak.spring.placement.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.placement.dto.request.CreatePlacementRequest;
import com.ssafy.tadak.spring.placement.service.PlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/placement")
@RequiredArgsConstructor
public class PlacementController {
    private final PlacementService placementService;

    @PostMapping
    public ResponseEntity<Void> createPlacement(
            @AuthUser UserInfo userInfo,
            @RequestBody CreatePlacementRequest request
    ) throws Exception {
        placementService.createBackground(userInfo.id(), request.imageId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
