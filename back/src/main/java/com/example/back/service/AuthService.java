package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.auth.SignInRequestDto;
import com.example.back.dto.request.auth.SignUpRequestDto;
import com.example.back.dto.response.auth.SignInResponseDto;
import com.example.back.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
