package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.auth.CheckCertificationRequestDto;
import com.example.back.dto.request.auth.EmailCertificationRequestDto;
import com.example.back.dto.request.auth.EmailCheckRequestDto;
import com.example.back.dto.request.auth.SignInRequestDto;
import com.example.back.dto.request.auth.SignUpRequestDto;
import com.example.back.dto.request.auth.ValidateNicknameRequestDto;
import com.example.back.dto.response.auth.CheckCertificationResponseDto;
import com.example.back.dto.response.auth.EmailCertificationResponseDto;
import com.example.back.dto.response.auth.EmailCheckResponseDto;
import com.example.back.dto.response.auth.SignInResponseDto;
import com.example.back.dto.response.auth.SignUpResponseDto;
import com.example.back.dto.response.auth.ValidateNicknameResponseDto;
import com.example.back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    
    //? 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp (
        @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    //? 로그인
    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn (
        @RequestBody @Valid SignInRequestDto requestBody
    ) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }

    //? 닉네임 중복체크
    @PostMapping("/nickname-check")
    public ResponseEntity<? super ValidateNicknameResponseDto> nicknameCheck(
        @RequestBody @Valid ValidateNicknameRequestDto requestBody
    ) {
        ResponseEntity<? super ValidateNicknameResponseDto> response = authService.nicknameCheck(requestBody);
        return response;
    }

    //? 이메일 중복체크
    @PostMapping("/email-check")
    public ResponseEntity<? super EmailCheckResponseDto> emailCheck (
        @RequestBody @Valid EmailCheckRequestDto requestBody
    ) {
        ResponseEntity<? super EmailCheckResponseDto> response = authService.emailCheck(requestBody);
        return response;
    }

    //? 인증메일 체크
    @PostMapping("/certification-check")
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(
        @RequestBody @Valid CheckCertificationRequestDto requestBody
        ) {
        ResponseEntity<? super CheckCertificationResponseDto> response = authService.checkCertification(requestBody);
        return response;
    }

    //? 메일 보내기
    @PostMapping("/email-send-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(
        @RequestBody @Valid EmailCertificationRequestDto requestBody
    ) {
        ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
        return response;
    }
}