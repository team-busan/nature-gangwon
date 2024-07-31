package com.example.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.entity.UserEntity;
import com.example.back.repository.UserRepository;
import com.example.back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplemet implements UserService{

    private final UserRepository userRepository;

    //? 유저 정보 갖고오기
    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String userEmail) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return GetUserResponseDto.getUserFail();
            } else {
                return GetUserResponseDto.success(userEntity);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }
    
}
