package com.ssafy.tadak.spring.keyboard.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Cleanup;
import lombok.Getter;

@Entity
@Table(name = "part_optioins")
@Getter
public class PartOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "part_option_id")
    private Long id;

    @Column(nullable = false, name = "part_id")
    private Long partId;

    @Column
    private String value;

    @Column
    private Integer price;

    @Column
    private Integer quantity;
}
