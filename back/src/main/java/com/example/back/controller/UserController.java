package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.user.PatchUserNicknameRequestDto;
import com.example.back.dto.request.user.PatchUserPasswordRequestDto;
import com.example.back.dto.request.user.PatchUserProfileRequestDto;
import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.dto.response.user.PatchUserNicknameResponseDto;
import com.example.back.dto.response.user.PatchUserPasswordResponseDto;
import com.example.back.dto.response.user.PatchUserProfileResponseDto;
import com.example.back.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService; 

    //? 유저정보 가져오기
    @GetMapping("")
    public ResponseEntity<? super GetUserResponseDto> getUser(@AuthenticationPrincipal String userEmail) {
        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(userEmail);
        return response;
    }

    //? 유저 닉네임 변경
    @PatchMapping("/nickname")
    public ResponseEntity<?super PatchUserNicknameResponseDto> patchUserNickname(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchUserNicknameRequestDto requestBody
    ) {
        ResponseEntity<? super PatchUserNicknameResponseDto> response = userService.patchUserNickname(userEmail, requestBody);
        return response;
    }

    //? 유저 프로필 변경
    @PatchMapping("/profile")
    public ResponseEntity<? super PatchUserProfileResponseDto> patchUserProfile(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchUserProfileRequestDto requestBody
    ) {
        ResponseEntity<? super PatchUserProfileResponseDto> response = userService.patchUserProfile(userEmail, requestBody);
        return response;
    }

    //? 유저 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity<? super PatchUserPasswordResponseDto>  patchUserPassword(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchUserPasswordRequestDto requestBody
    ) {
        ResponseEntity<? super PatchUserPasswordResponseDto> response = userService.patchUserPassword(userEmail, requestBody);
        return response;
    }
}
