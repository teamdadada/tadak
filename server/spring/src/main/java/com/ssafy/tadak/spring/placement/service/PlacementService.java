package com.ssafy.tadak.spring.placement.service;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.ImageException;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import com.ssafy.tadak.spring.placement.domain.entity.MainPlacement;
import com.ssafy.tadak.spring.placement.domain.entity.Placement;
import com.ssafy.tadak.spring.placement.domain.repository.MainPlacementJpaRepository;
import com.ssafy.tadak.spring.placement.domain.repository.PlacementJpaRepository;
import com.ssafy.tadak.spring.placement.dto.VectorDto;
import com.ssafy.tadak.spring.placement.dto.response.GetUserDefaultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.tadak.spring.minio.exception.ImageErrorCode.IMAGE_NOTFOUND;
import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementService {

    private final ImageJpaRepository imageJpaRepository;
    private final PlacementJpaRepository backgroundJpaRepository;
    private final MinioUtil minioUtil;
    private final MainPlacementJpaRepository mainPlacementJpaRepository;

    /** 유저 기본 배치 불러오기
     * 키보드 배치 시뮬레이션 페이지로 redirection 될 때 호출되는 메소드입니다.
     * 유저의 대표 배치와 키보드 정보를 불러옵니다.
     * **/
    public GetUserDefaultResponse getUserDefaultBackground(Long userId) {
        MainPlacement mainPlacement = mainPlacementJpaRepository.findByUserId(userId);

        Keyboard keyboard = mainPlacement.getKeyboard();
        Placement placement = mainPlacement.getPlacement();

        Long keyboardId = null;
        String imageUrl = null;
        String modelUrl = null;

        if(keyboard != null){
            keyboardId = keyboard.getId();

            Image image = keyboard.getThumbnail();
            Image model = keyboard.getModel();

            try{
                imageUrl = minioUtil.getImageUrl(image.getBucket(),image.getFilePath());
                modelUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
            }catch (Exception e){
                throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
            }
        }

        VectorDto.Vector2 position = VectorDto.Vector2.builder()
                .x(placement.getLocationX())
                .y(placement.getLocationY())
                .build();

        VectorDto.Vector3 rotation = VectorDto.Vector3.builder()
                .x(placement.getRotationX())
                .y(placement.getRotationY())
                .z(placement.getRotationZ())
                .build();

        //todo: scale 차원 확인 후 placement 엔티티에 추가
        VectorDto.Vector3 scale = VectorDto.Vector3.builder()
                .x(0D)
                .y(0D)
                .z(0D)
                .build();

        return GetUserDefaultResponse.builder()
                .placementId(placement.getId())
                .keyboardId(keyboardId)
                .position(position)
                .rotation(rotation)
                .scale(scale)
                .imageUrl(imageUrl)
                .model3dUrl(modelUrl)
                .build();
    }

    /** 키보드 배치 초기 이미지 저장
     * 키보드 배치 시뮬레이션을 위한 배경을 저장합니다.
     * 키보드를 배치하기 이전에 등록이 필요하기 때문에 배치 정보는 default 값으로 설정됩니다.
     * 유저가 직접 업로드한 이미지는 모두 canDelete 가 true 입니다.
     * **/
    @Transactional
    public void createBackground(
            Long userId,
            Long imageId
    ) throws Exception {
        Image image = imageJpaRepository.findById(imageId)
                .orElseThrow(()->new ImageException.ImageNotFoundException(IMAGE_NOTFOUND));

        String imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());

        Placement newBackground = backgroundJpaRepository.save(Placement.builder()
                                            .userId(userId)
                                            .image(image)
                                            .canDelete(true)
                                            .locationX(0D)
                                            .locationY(0D)
                                            .rotationX(0D)
                                            .rotationY(0D)
                                            .rotationZ(0D)
                                            //todo: scale value setting
                                    .build());
    }

    /** 배치 정보 업데이트
     * 유저가 키보드 배치 후 저장하는 순간 호출됩니다.
     * 유저가 기존 배치 정보를 업데이트합니다.
     * 마지막으로 저정된 배치가 대표 배치가 되므로 MainPlacement 를 함께 업데이트 합니다.
     * **/
    public void updateBackground(){

    }

    /** 배치 정보 리스트
     * 사용자의 배치 정보 리스트를 반환합니다.
     * 배치 정보가 없을 경우 서비스의 기본 배치 정보를 생성합니다.
     * **/
    public void getPlacementList(){

    }
}
