package com.ssafy.tadak.spring.zzim.domain.entity;

import com.ssafy.tadak.spring.product.domain.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "zzims")
public class Zzim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zzim_id", nullable = false)
    private Long zzimId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Builder
    public Zzim(Long productId, Long ownerId) {
        this.productId = productId;
        this.ownerId = ownerId;
    }
}
