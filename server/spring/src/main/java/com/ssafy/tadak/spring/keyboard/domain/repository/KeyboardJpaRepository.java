package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyboardJpaRepository extends JpaRepository<Keyboard, Long> {
}
