package com.ssafy.tadak.spring.keyboard.mapper;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.dto.KeyboardUpdateDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-15T15:00:36+0900",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class KeyboardMapperImpl implements KeyboardMapper {

    @Override
    public void updateKeyboardFromDto(KeyboardUpdateDto dto, Keyboard keyboard) {
        if ( dto == null ) {
            return;
        }

        if ( dto.name() != null ) {
            keyboard.setName( dto.name() );
        }
        if ( dto.thumbnail() != null ) {
            keyboard.setThumbnail( dto.thumbnail() );
        }
        if ( dto.model() != null ) {
            keyboard.setModel( dto.model() );
        }
        if ( dto.price() != null ) {
            keyboard.setPrice( dto.price() );
        }
        if ( dto.colors() != null ) {
            keyboard.setColors( dto.colors() );
        }
        if ( dto.bareboneOption() != null ) {
            keyboard.setBareboneOption( dto.bareboneOption() );
        }
        if ( dto.keycapOption() != null ) {
            keyboard.setKeycapOption( dto.keycapOption() );
        }
        if ( dto.switchOption() != null ) {
            keyboard.setSwitchOption( dto.switchOption() );
        }
    }
}
