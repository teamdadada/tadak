package com.ssafy.tadak.spring.user.controller;

import com.ssafy.tadak.spring.user.domain.UserRepository;
import com.ssafy.tadak.spring.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userspring")
public class UserContoller {

    private final UserRepository userRepository;

    @GetMapping("/{user_id}")
    public ResponseEntity<User> getUser(@PathVariable(name="user_id") Long user_id) {
        User u = userRepository.findById(user_id)
                .orElse(null);

        return ResponseEntity.ok(u);


    }
}
