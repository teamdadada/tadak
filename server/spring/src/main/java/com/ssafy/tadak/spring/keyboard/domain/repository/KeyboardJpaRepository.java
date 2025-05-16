package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeyboardJpaRepository extends JpaRepository<Keyboard, Long> {
    List<Keyboard> findAllByUserIdOrderByCreatedAtAsc(Long userId);
}
