package com.ssafy.tadak.spring.keyboard.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetOptionsResponse {
    private Barebone barebone;
    @JsonProperty("switch")
    private Switch switchObj;
    private Keycap keycap;

    @Getter
    @NoArgsConstructor
    public static class Barebone {
        private List<OptionName> layout;
        private List<OptionName> material;

        public Barebone(List<OptionName> layout, List<OptionName> material) {
            this.layout = layout;
            this.material = material;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Switch {
        private List<OptionName> type;

        public Switch(List<OptionName> type) {
            this.type = type;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Keycap {
        private String op;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OptionName{
        Long id;
        String name;
    }

}
