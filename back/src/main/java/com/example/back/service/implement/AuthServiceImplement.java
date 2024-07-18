package com.example.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.auth.SignUpRequestDto;
import com.example.back.dto.response.auth.SignUpResponseDto;
import com.example.back.dto.response.user.ValidateNicknameResponseDto;
import com.example.back.entity.UserEntity;
import com.example.back.repository.UserRepository;
import com.example.back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();
            boolean isExistId = userRepository.existsByUserEmail(userEmail);
            if(isExistId) return SignUpResponseDto.duplicateId();

            String userPassword = dto.getUserPassword();
            String encodePassword = passwordEncoder.encode(userPassword);
            dto.setUserPassword(encodePassword);

            String userNickname = dto.getUserNickname();
            boolean hasNickname = userRepository.existsByUserNickname(userNickname);
            if(hasNickname) {
                return ValidateNicknameResponseDto.existNickname();
            }

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }
}
