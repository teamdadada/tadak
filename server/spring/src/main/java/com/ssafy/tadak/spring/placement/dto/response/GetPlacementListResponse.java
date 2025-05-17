package com.ssafy.tadak.spring.placement.dto.response;

import lombok.Builder;

@Builder
public record GetPlacementListResponse (
        Long placementId,
        String imageUrl,
        Boolean isDefault,
        Boolean canDelete
){
}
