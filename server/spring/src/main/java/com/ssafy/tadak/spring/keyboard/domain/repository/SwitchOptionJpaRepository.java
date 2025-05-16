package com.ssafy.tadak.spring.keyboard.domain.repository;

import com.ssafy.tadak.spring.keyboard.domain.entity.SwitchOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SwitchOptionJpaRepository extends JpaRepository<SwitchOption, Long> {
    List<SwitchOption> findByType(Long type);

    List<SwitchOption> findAllByType(Long type);
}
