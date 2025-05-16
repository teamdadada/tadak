package com.ssafy.tadak.spring.placement.domain.entity;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.minio.domain.entity.Image;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

@Entity
@Table(name = "background_images")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Background {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "background_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyboard_id")
    private Keyboard keyboard;

    @OneToOne
    @Column(name = "image_id")
    Image image;

    @Column(name = "is_default")
    Boolean isDefault;

    @Column(name = "locatioin_x")
    Double locationX;

    @Column(name = "location_y")
    Double locationY;

    @Column(name = "rotation_x")
    Double rotationX;

    @Column(name = "rotation_Y")
    Double rotationY;

    @Column(name = "rotation_Z")
    Double rotationZ;

    // todo: 크기

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

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
    public Background(
            Long userId,
            Image image,
            Boolean isDefault,
            Double locationX,
            Double locationY,
            Double rotationX,
            Double rotationY,
            Double rotationZ
    ) {
        this.userId = userId;
        this.image = image;
        this.isDefault = isDefault;
        this.locationX = locationX;
        this.locationY = locationY;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
    }
}
