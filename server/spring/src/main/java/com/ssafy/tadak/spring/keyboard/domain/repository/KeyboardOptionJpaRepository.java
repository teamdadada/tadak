package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.Keyboard;
import com.ssafy.tadak.spring.keyboard.domain.entity.KeyboardOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeyboardOptionJpaRepository extends JpaRepository<KeyboardOption, Long> {
    List<KeyboardOption> findAllByKeyboard(Keyboard keyboard);
}
