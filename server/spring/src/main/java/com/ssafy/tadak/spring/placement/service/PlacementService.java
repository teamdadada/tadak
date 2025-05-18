package com.ssafy.tadak.spring.placement.service;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.repository.KeyboardJpaRepository;
import com.ssafy.tadak.spring.keyboard.exception.KeyboardException;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.ImageException;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.service.MinioService;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import com.ssafy.tadak.spring.placement.domain.entity.MainPlacement;
import com.ssafy.tadak.spring.placement.domain.entity.Placement;
import com.ssafy.tadak.spring.placement.domain.repository.MainPlacementJpaRepository;
import com.ssafy.tadak.spring.placement.domain.repository.PlacementJpaRepository;
import com.ssafy.tadak.spring.placement.dto.VectorDto;
import com.ssafy.tadak.spring.placement.dto.response.GetPlacementDetailResponse;
import com.ssafy.tadak.spring.placement.dto.response.GetPlacementListResponse;
import com.ssafy.tadak.spring.placement.dto.response.GetUserDefaultResponse;
import com.ssafy.tadak.spring.placement.exception.PlacementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.tadak.spring.keyboard.exception.KeyboardErrorCode.KEYBOARD_NOTFOUND;
import static com.ssafy.tadak.spring.minio.exception.ImageErrorCode.IMAGE_NOTFOUND;
import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;
import static com.ssafy.tadak.spring.placement.exception.PlacementErrorCode.PLACEMENT_FORBIDDEN;
import static com.ssafy.tadak.spring.placement.exception.PlacementErrorCode.PLACEMENT_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementService {

    private final ImageJpaRepository imageJpaRepository;
    private final MinioUtil minioUtil;
    private final MainPlacementJpaRepository mainPlacementJpaRepository;
    private final PlacementJpaRepository placementJpaRepository;
    private final KeyboardJpaRepository keyboardJpaRepository;
    private final MinioService minioService;

    /** 유저 기본 배치 불러오기
     * 키보드 배치 시뮬레이션 페이지로 redirection 될 때 호출되는 메소드입니다.
     * 유저의 대표 배치와 키보드 정보를 불러옵니다.
     * 배경 이미지와 키보드 모델을 함께 반환합니다.
     * **/
    public GetUserDefaultResponse getUserDefaultBackground(Long userId) {
        MainPlacement mainPlacement = mainPlacementJpaRepository.findByUserId(userId);

        Keyboard keyboard = mainPlacement.getKeyboard();
        Placement placement = mainPlacement.getPlacement();

        Long keyboardId = null;
        String imageUrl = null;
        String modelUrl = null;

        Image image = placement.getImage();

        try{
            imageUrl = minioUtil.getImageUrl(image.getBucket(),image.getFilePath());
            if(keyboard != null){
                keyboardId = keyboard.getId();
                Image model = keyboard.getModel();
                modelUrl = minioUtil.getImageUrl(model.getBucket(), model.getFilePath());
            }
        }catch (Exception e){
            throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
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

        VectorDto.Vector3 scale = VectorDto.Vector3.builder()
                .x(placement.getScaleX())
                .y(placement.getScaleY())
                .z(placement.getScaleZ())
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

        Placement newBackground = placementJpaRepository.save(Placement.builder()
                                            .userId(userId)
                                            .image(image)
                                            .canDelete(true)
                                            .locationX(0D)
                                            .locationY(0D)
                                            .rotationX(0D)
                                            .rotationY(0D)
                                            .rotationZ(0D)
                                            .scaleX(0D)
                                            .scaleZ(0D)
                                            .scaleZ(0D)
                                    .build());
    }

    /** 배치 정보 업데이트
     * 유저가 키보드 배치 후 저장하는 순간 호출됩니다.
     * 유저가 기존 배치 정보를 업데이트합니다.
     * 마지막으로 저정된 배치가 대표 배치가 되므로 MainPlacement 를 함께 업데이트 합니다.
     * **/
    @Transactional
    public void updatePlacement(
            Long userId,
            Long placementId,
            Long keyboardId,
            VectorDto.Vector2 position,
            VectorDto.Vector3 rotation,
            VectorDto.Vector3 scale
    ){
        Placement placement = placementJpaRepository
                .findById(placementId)
                .orElseThrow(()-> new PlacementException.PlacementNotFoundException(PLACEMENT_NOTFOUND));

        if(placement.getUserId() == null
                || !placement.getUserId().equals(userId)){
            throw new PlacementException.PlacementForbiddenException(PLACEMENT_FORBIDDEN);
        }
        placement.updatePlacement(position, rotation, scale);

        Keyboard keyboard = null;
        if (keyboardId != null) {
            keyboard = keyboardJpaRepository.findById(keyboardId)
                    .orElseThrow(() -> new KeyboardException.KeyboardNotFoundException(KEYBOARD_NOTFOUND));
        }

        MainPlacement userDefault = mainPlacementJpaRepository.findByUserId(userId);
        userDefault.setKeyboard(keyboard);
        userDefault.setPlacement(placement);
    }

    /** 배치 정보 삭제
     * 사용자 배치 정보와 이미지를 삭제합니다.
     * 기본 생성 배치는 삭제할 수 없습니다.
     * **/
    public void deletePlacement(Long userId, Long placementId){
        Placement placement = placementJpaRepository.findById(placementId)
                .orElseThrow(()-> new PlacementException.PlacementNotFoundException(PLACEMENT_NOTFOUND));
        MainPlacement userDefault = mainPlacementJpaRepository.findByUserId(userId);

        //삭제 가능한 배치이고, 디폴트 배치가 아니면서 유저가 생성한 배치인 경우
        if(placement.getCanDelete()
                && placement.getUserId().equals(userId)
                && userDefault != null
                && !userDefault.getPlacement().getId().equals(placementId)
        ){
            Image image = placement.getImage();
            try{
                minioService.deleteFile(image.getId());
            }catch (Exception e){
                throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
            }
            placementJpaRepository.delete(placement);
            return;
        }
        throw new PlacementException.PlacementForbiddenException(PLACEMENT_FORBIDDEN);
    }

    //fixme: 리스트를 조회하는 메서드에서 초기 배치를 생성하는 로직이 포함되는 게
    // 책임 분리가 잘 되어있는지 의문이 듭니다.
    // 초기 배치 정보는 유저당 한 번만 생성되기 때문에
    // 유저 가입 시 처리하는 방법도 고려해볼 수 있을 것 같습니다.
    /** 배치 정보 리스트
     * 사용자의 배치 정보 리스트를 반환합니다.
     * 배치 정보가 없을 경우 서비스의 기본 배치 정보를 생성합니다.
     * **/
    @Transactional
    public List<GetPlacementListResponse> getPlacementList(Long userId) {
        List<Placement> userPlacementList = placementJpaRepository.findAllByUserId(userId);

        //유저 배치 정보가 없으면 기본 배치 생성
        if(userPlacementList.isEmpty()){ //findAll은 일치하는 값이 없을 경우 빈 리스트 반환
            createDefaultPlacement(userId);
            userPlacementList = placementJpaRepository.findAllByUserId(userId);
        }

        //유저 기본 배치 가져오기
        MainPlacement userDefault = mainPlacementJpaRepository.findByUserId(userId);
        Long defaultPlacementId = userDefault.getPlacement().getId();

        return userPlacementList.stream()
                .map(p->{
                    Image image = p.getImage();
                    String imageUrl = null;
                    try{
                        imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());
                    }catch (Exception e){
                        throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
                    }

                    return GetPlacementListResponse.builder()
                            .placementId(p.getId())
                            .imageUrl(imageUrl)
                            .isDefault(p.getId().equals(defaultPlacementId))
                            .canDelete(p.getCanDelete())
                            .build();
                })
                .toList();
    }

    /** 배치 상세 조회
     * 사용자 배치 정보를 조회합니다.
     * position 값과 배경 이미지를 반환합니다.
     * **/
    public GetPlacementDetailResponse getPlacementDetail(
            Long userId,
            Long placementId
    ){
        Placement placement = placementJpaRepository.findById(placementId)
                .orElseThrow(()->new PlacementException.PlacementNotFoundException(PLACEMENT_NOTFOUND));

        if(!placement.getUserId().equals(userId)){
            throw new PlacementException.PlacementForbiddenException(PLACEMENT_FORBIDDEN);
        }

        Image image = placement.getImage();
        String imageUrl = null;
        try{
            imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());
        }catch (Exception e){
            throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
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

        VectorDto.Vector3 scale = VectorDto.Vector3.builder()
                .x(placement.getScaleX())
                .y(placement.getScaleY())
                .z(placement.getScaleZ())
                .build();

        return GetPlacementDetailResponse.builder()
                .placementId(placement.getId())
                .position(position)
                .rotation(rotation)
                .scale(scale)
                .imageUrl(imageUrl)
                .build();
    }

    /** 기본 배치 생성
     * 초기 배치 정보를 생성하는 메서드입니다.
     * 유저 배치 정보가 없을 때 호출됩니다.
     * 생성된 배치 정보 중 하나가 유저 default 배치로 저장됩니다.
     * **/
    private void createDefaultPlacement(Long userId) {
        List<Placement> servicePlacementList = placementJpaRepository
                .findAllByUserIdAndCanDeleteOrderById(null, false);

        for(Placement servicePlacement : servicePlacementList){
            Image image = servicePlacement.getImage();

            placementJpaRepository.save(
                    Placement.builder()
                            .userId(userId)
                            .image(image)
                            .canDelete(false)
                            .locationX(servicePlacement.getLocationX())
                            .locationY(servicePlacement.getLocationY())
                            .rotationX(servicePlacement.getRotationX())
                            .rotationY(servicePlacement.getRotationY())
                            .rotationZ(servicePlacement.getRotationZ())
                            .scaleX(servicePlacement.getScaleX())
                            .scaleY(servicePlacement.getScaleY())
                            .scaleZ(servicePlacement.getScaleZ())
                            .build()
            );
        }

        Placement userDefault = placementJpaRepository
                .findByUserIdAndImage(
                        userId,
                        servicePlacementList
                                .get(0)
                                .getImage()
                );

        mainPlacementJpaRepository.save(
                MainPlacement.builder()
                        .userId(userId)
                        .keyboard(null)
                        .placement(userDefault)
                        .build()
        );
    }
}
