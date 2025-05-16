package com.ssafy.tadak.spring.placement.service;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.ImageException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import com.ssafy.tadak.spring.placement.dto.response.CreateBackgroundResponse;
import com.ssafy.tadak.spring.placement.domain.entity.Placement;
import com.ssafy.tadak.spring.placement.domain.repository.PlacementJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.tadak.spring.minio.exception.ImageErrorCode.IMAGE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementService {

    private final ImageJpaRepository imageJpaRepository;
    private final PlacementJpaRepository backgroundJpaRepository;
    private final MinioUtil minioUtil;

    /** 기본 배치 불러오기
     * 서비스 기본 배치 정보를 불러옵니다.
     * 유저가 초기화 버튼을 누르는 순간 호출됩니다.
     * 서비스 기본 배치는 userId==null && isDefault==true 입니다.
     * **/
    public void getDefaultBackground() {
//        Placement background = backgroundJpaRepository
    }

    /** 유저 기본 배치 불러오기
     * 키보드 배치 시뮬레이션 페이지로 redirection 될 때 호출되는 메소드입니다.
     * 유저가 설정한 배치가 있으면 유저 배치를 가져오고
     * 유저가 설정한 배치가 없으면 서비스 기본 배치를 가져옵니다.
     * **/
    public void getUserDefaultBackground(Long userId) {

    }

    /** 키보드 배치 초기 이미지 저장
     * 키보드 배치 시뮬레이션을 위한 배경을 저장합니다.
     * 키보드를 배치하기 이전에 등록이 필요하기 때문에
     * 키보드와 배치 정보는 default 값으로 설정됩니다.
     * **/
    public CreateBackgroundResponse CreateBackground(
            Long userId,
            Long imageId
    ) throws Exception {
        Image image = imageJpaRepository.findById(imageId)
                .orElseThrow(()->new ImageException.ImageNotFoundException(IMAGE_NOTFOUND));

        String imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());

        Placement newBackground = backgroundJpaRepository.save(Placement.builder()
                                            .userId(userId)
                                            .image(image)
                                            .locationX(0D)
                                            .locationY(0D)
                                            .rotationX(0D)
                                            .rotationY(0D)
                                            .rotationZ(0D)
                                            //todo: scale value setting
                                    .build());
        return CreateBackgroundResponse.builder()
                .id(newBackground.getId())
                .imageUrl(imageUrl)
                .locationX(newBackground.getLocationX())
                .locationY(newBackground.getLocationY())
                .rotationX(newBackground.getRotationX())
                .rotationY(newBackground.getRotationY())
                .rotationZ(newBackground.getRotationZ())
                .build();
    }

    /** 배치 정보 업데이트
     * 유저가 키보드 배치 후 저장하는 순간 호출됩니다.
     * 서비스 기본 이미지에 배치한 경우 유저 고유의 기본 배치를 생성합니다.
     * 이때, isDefault는 true입니다.
     * 유저가 이미지에 배치하는 경우 기존 배치 정보를 업데이트합니다.
     * **/
    public void UpdateBackground(){

    }
}
