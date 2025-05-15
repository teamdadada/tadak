package com.ssafy.tadak.spring.keyboard.mapper;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.dto.KeyboardUpdateDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface KeyboardMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateKeyboardFromDto(KeyboardUpdateDto dto, @MappingTarget Keyboard keyboard);
}
