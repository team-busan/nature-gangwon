package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService; 

    @GetMapping("")
    public ResponseEntity<? super GetUserResponseDto> getUser(@AuthenticationPrincipal String userEmail) {
        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(userEmail);
        return response;
    }
}
