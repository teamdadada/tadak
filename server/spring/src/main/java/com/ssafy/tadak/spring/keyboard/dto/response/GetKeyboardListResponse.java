package com.ssafy.tadak.spring.keyboard.dto.response;

import java.util.List;

public record GetKeyboardListResponse(
        Long keyboardId,
        String name,
        String thumbnailUrl
) {
}
