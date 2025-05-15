package com.ssafy.tadak.spring.user.domain;

import com.ssafy.tadak.spring.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
