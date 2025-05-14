package com.ssafy.tadak.spring.keyboard.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class Colors {
        String outerColor;
        Keycap keycap;

        @Getter
        @Setter
        @NoArgsConstructor
        public class Keycap {
            String basicColor;
            Map<String, String> pointColors;
    }

}
