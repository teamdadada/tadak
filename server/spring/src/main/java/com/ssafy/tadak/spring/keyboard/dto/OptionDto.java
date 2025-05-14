package com.ssafy.tadak.spring.keyboard.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OptionDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class SelectedOption {
        private Barebone bareboneOption;
        private Switch switchOption;
    }

    @Getter
    @NoArgsConstructor
    public static class Barebone {
        private Long layout;
        private Long material;

        public Barebone(Long layout, Long material) {
            this.layout = layout;
            this.material = material;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Switch {
        private Long type;

        public Switch(Long type) {
            this.type = type;
        }
    }
}
