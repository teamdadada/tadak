package com.ssafy.tadak.spring.placement.domain.entity;

import com.ssafy.tadak.spring.minio.domain.entity.Image;
import com.ssafy.tadak.spring.placement.dto.VectorDto;
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
@Table(name = "placements")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Placement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "background_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    Image image;

    @Column(name = "can_delete", updatable = false)
    Boolean canDelete;

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

    @Column(name = "scale_x")
    Double scaleX;

    @Column(name = "scale_Y")
    Double scaleY;

    @Column(name = "scale_Z")
    Double scaleZ;

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
    public Placement(
            Long userId,
            Image image,
            Boolean canDelete,
            Double locationX,
            Double locationY,
            Double rotationX,
            Double rotationY,
            Double rotationZ,
            Double scaleX,
            Double scaleY,
            Double scaleZ
    ) {
        this.userId = userId;
        this.image = image;
        this.canDelete = canDelete;
        this.locationX = locationX;
        this.locationY = locationY;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
    }

    public void updatePlacement(VectorDto.Vector2 position, VectorDto.Vector3 rotation, VectorDto.Vector3 scale) {
        this.locationX = position.x();
        this.locationY = position.y();
        this.rotationX = rotation.x();
        this.rotationY = rotation.y();
        this.rotationZ = rotation.z();
        this.scaleX = scale.x();
        this.scaleY = scale.y();
        this.scaleZ = scale.z();
    }
}
