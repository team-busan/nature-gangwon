package com.example.back.service;

import org.springframework.http.ResponseEntity;

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

public interface AuthService {
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto);
    ResponseEntity<? super EmailCheckResponseDto> emailCheck(EmailCheckRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
    ResponseEntity<? super ValidateNicknameResponseDto> nicknameCheck(ValidateNicknameRequestDto dto);
    ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto);
}
