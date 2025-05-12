package com.ssafy.tadak.spring.keyboard.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "keyboards")
@Getter
public class Keyboard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "kayboard_id")
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(name = "cart_id")
    private Long cartId;

    @Column(nullable = false, name = "keyboard_name")
    private String name;

    @Column(name = "keyboard_imageurl")
    private String imageUrl;

    @Column(name = "keyboard_price")
    private Integer price;

    @Column(name = "keyboard_color")
    private String color;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany (mappedBy = "part_option_id")
    private List<PartOption> partOptions;
}
