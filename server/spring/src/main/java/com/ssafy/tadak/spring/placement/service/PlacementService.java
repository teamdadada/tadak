package com.ssafy.tadak.spring.placement.service;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.repository.ImageJpaRepository;
import com.ssafy.tadak.spring.minio.exception.ImageException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import com.ssafy.tadak.spring.placement.domain.dto.response.CreateBackgroundResponse;
import com.ssafy.tadak.spring.placement.domain.entity.Background;
import com.ssafy.tadak.spring.placement.domain.repository.BackgroundJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.tadak.spring.minio.exception.ImageErrorCode.IMAGE_NOTFOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementService {

    private final ImageJpaRepository imageJpaRepository;
    private final BackgroundJpaRepository backgroundJpaRepository;
    private final MinioUtil minioUtil;

    public CreateBackgroundResponse CreateBackground(
            Long userId,
            Long imageId,
            Double locationX,
            Double locationY,
            Double rotationX,
            Double rotationY,
            Double rotationZ
    ) throws Exception {
        Image image = imageJpaRepository.findById(imageId)
                .orElseThrow(()->new ImageException.ImageNotFoundException(IMAGE_NOTFOUND));

        String imageUrl = minioUtil.getImageUrl(image.getBucket(), image.getFilePath());

        Background newBackground = backgroundJpaRepository.save(Background.builder()
                                            .isDefault(false)
                                            .userId(userId)
                                            .image(image)
                                            .locationX(locationX)
                                            .locationY(locationY)
                                            .rotationX(rotationX)
                                            .rotationY(rotationY)
                                            .rotationZ(rotationZ)
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
}
