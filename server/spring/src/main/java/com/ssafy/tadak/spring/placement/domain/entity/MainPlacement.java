package com.ssafy.tadak.spring.placement.domain.entity;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "main_placements")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MainPlacement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_placement_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "keyboard_id")
    Keyboard keyboard;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "placement_id")
    Placement placement;
}
