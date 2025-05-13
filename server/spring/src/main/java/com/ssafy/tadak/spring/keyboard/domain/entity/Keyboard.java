package com.ssafy.tadak.spring.keyboard.domain.entity;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.minio.domain.entity.Model;
import com.ssafy.tadak.spring.product.domain.entity.Keycap;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "keyboards")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyboard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "kayboard_id")
    private Long id;

    //todo: User로 매핑
    @Column(nullable = false, name = "user_id")
    private Long userId;

    //todo: 장바구니로 매핑
    @Column(name = "cart_id")
    private Long cartId;

    @Column(nullable = false, name = "keyboard_name")
    private String name;

    @OneToOne
    @JoinColumn(name = "thumbnail_id")
    private Image thumbnail;

    @OneToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @Column(name = "keyboard_price")
    private Integer price;

    @Column(name = "keyboard_color")
    private String color;

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

    @OneToMany (mappedBy = "keyboard")
    private List<KeyboardOption> keyboardOptions;

    @Builder
    public Keyboard(
            Long userId,
            Long cartId,
            String name,
            Image thumbnail,
            Model model,
            Integer price,
            String color,
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
        this.color = color;
        this.bareboneOption = bareboneOption;
        this.keycapOption = keycapOption;
        this.switchOption = switchOption;
    }
}
