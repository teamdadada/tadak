package com.ssafy.tadak.spring.keyboard.converter;

import com.ssafy.tadak.spring.keyboard.domain.ProductOption;
import com.ssafy.tadak.spring.keyboard.dto.response.GetProductListResponse;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.exception.MinioException;
import com.ssafy.tadak.spring.minio.util.MinioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.ssafy.tadak.spring.minio.exception.MinioErrorCode.FILE_NOTFOUND;

@Component
@RequiredArgsConstructor
public class ProductConverter {
    private final MinioUtil minioUtil;

    public List<GetProductListResponse.ProductInfo> convertToProductInfoList(List<? extends ProductOption> options) {
        return options.stream()
                .map(op -> {
                    Image image = op.getImage();
                    String imageUrl = null;
                    try {
                        imageUrl = image != null ? minioUtil.getImageUrl(image.getBucket(), image.getFilePath()) : null;
                    } catch (Exception e) {
                        throw new MinioException.MinioNotFoundException(FILE_NOTFOUND);
                    }
                    return GetProductListResponse.ProductInfo.builder()
                            .productId(op.getId())
                            .name(op.getName())
                            .price(op.getPrice())
                            .quantity(op.getQuantity())
                            .imageUrl(imageUrl)
                            .build();
                })
                .toList();
    }

}
