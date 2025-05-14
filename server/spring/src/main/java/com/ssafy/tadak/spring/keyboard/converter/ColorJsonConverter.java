package com.ssafy.tadak.spring.keyboard.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ColorJsonConverter implements AttributeConverter<Colors, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Colors attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("colors 직렬화 실패", e);
        }
    }

    @Override
    public Colors convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, Colors.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("colors 역직렬화 실패", e);
        }
    }
}
