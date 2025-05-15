package com.ssafy.tadak.spring.keyboard.domain.entity;

import com.ssafy.tadak.spring.keyboard.converter.ColorJsonConverter;
import com.ssafy.tadak.spring.keyboard.dto.request.Colors;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "keyboards")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyboard_id")
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    //todo: 장바구니로 매핑
    @Column(name = "cart_id")
    private Long cartId;

    @Column(nullable = false, name = "keyboard_name")
    private String name;

    // fixme: ManyToOne?
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "thumbnail_id")
    private Image thumbnail;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "model_id")
    private Image model;

    @Column(name = "keyboard_price")
    private Integer price;

    @Column(name = "keyboard_color", columnDefinition = "json")
    @Convert(converter = ColorJsonConverter.class)
    private Colors colors;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "barebone_option_id")
    BareboneOption bareboneOption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keycap_option_id")
    KeycapOption keycapOption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "switch_option_id")
    SwitchOption switchOption;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany (mappedBy = "keyboard", cascade = CascadeType.REMOVE)
    private List<KeyboardOption> keyboardOptions;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Builder
    public Keyboard(
            Long userId,
            Long cartId,
            String name,
            Image thumbnail,
            Image model,
            Integer price,
            Colors color,
            BareboneOption bareboneOption,
            KeycapOption keycapOption,
            SwitchOption switchOption
    ) {
        this.userId = userId;
        this.cartId = cartId;
        this.name = name;
        this.thumbnail = thumbnail;
        this.model = model;
        this.price = price;
        this.colors = color;
        this.bareboneOption = bareboneOption;
        this.keycapOption = keycapOption;
        this.switchOption = switchOption;
    }
}
