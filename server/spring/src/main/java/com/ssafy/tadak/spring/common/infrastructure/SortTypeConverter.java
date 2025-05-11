package com.ssafy.tadak.spring.common.infrastructure;

import com.ssafy.tadak.spring.common.enums.SortType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class SortTypeConverter implements Converter<String, SortType> {
    @Override
    public SortType convert(String source) {
        return SortType.valueOf(source.trim().toUpperCase());
    }
}
