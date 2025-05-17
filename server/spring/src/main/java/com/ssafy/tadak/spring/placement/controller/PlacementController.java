package com.ssafy.tadak.spring.placement.controller;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.placement.dto.VectorDto;
import com.ssafy.tadak.spring.placement.dto.request.CreatePlacementRequest;
import com.ssafy.tadak.spring.placement.dto.request.UpdatePlacementRequest;
import com.ssafy.tadak.spring.placement.dto.response.GetPlacementListResponse;
import com.ssafy.tadak.spring.placement.dto.response.GetUserDefaultResponse;
import com.ssafy.tadak.spring.placement.service.PlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/default")
    public ResponseEntity<GetUserDefaultResponse> getUserDefault(
            @AuthUser UserInfo userInfo
    ){
        return ResponseEntity.ok(
                placementService.getUserDefaultBackground(userInfo.id())
        );
    }

    @GetMapping
    public ResponseEntity<List<GetPlacementListResponse>> getPlacementList(
            @AuthUser UserInfo userInfo
    ){
        return ResponseEntity.ok(
                placementService.getPlacementList(userInfo.id())
        );
    }

    @PatchMapping
    public ResponseEntity<Void> updatePlacement(
            @AuthUser UserInfo userInfo,
            @RequestBody UpdatePlacementRequest request
    ){
        placementService.updatePlacement(
                userInfo.id(),
                request.placementId(),
                request.keyboardId(),
                request.position(),
                request.rotation(),
                request.scale()
        );
        return ResponseEntity.noContent().build();
    }
}
