package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.response.user.GetUserResponseDto;

public interface UserService {
    ResponseEntity<? super GetUserResponseDto> getUser(String userEmail);
}
