package com.ssafy.tadak.spring.minio.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Table(name = "buckets")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bucket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bucket_id")
    private Long id;

    @Column(nullable = false, name = "bucket_name")
    private String name;

    @Column(nullable = false, name = "is_public")
    private Boolean isPublic;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder
    public Bucket(
            String name,
            Boolean isPublic
    ) {
        this.name = name;
        this.isPublic = isPublic;
    }
}
