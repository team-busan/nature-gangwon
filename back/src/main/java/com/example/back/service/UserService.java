package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.user.PatchUserNicknameRequestDto;
import com.example.back.dto.request.user.PatchUserProfileRequestDto;
import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.dto.response.user.PatchUserNicknameResponseDto;
import com.example.back.dto.response.user.PatchUserProfileResponseDto;

public interface UserService {
    ResponseEntity<? super GetUserResponseDto> getUser(String userEmail);
    ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(String userEmail, PatchUserNicknameRequestDto dto);
    ResponseEntity<? super PatchUserProfileResponseDto> patchUserProfile(String userEmail, PatchUserProfileRequestDto dto);
}
