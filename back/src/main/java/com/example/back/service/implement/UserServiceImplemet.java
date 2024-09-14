package com.example.back.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.user.PatchUserNicknameRequestDto;
import com.example.back.dto.request.user.PatchUserProfileRequestDto;
import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.dto.response.user.PatchUserNicknameResponseDto;
import com.example.back.dto.response.user.PatchUserProfileResponseDto;
import com.example.back.entity.PlanCommentEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.PlanCommentRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplemet implements UserService{

    private final UserRepository userRepository;

    private final PlanCommentRepository planCommentRepository;

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

    //? 유저 닉네임 수정하기 (추후 디테일, 페스티벌 댓글도 set추가하기)
    @Override
    public ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(String userEmail, PatchUserNicknameRequestDto dto) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PatchUserNicknameResponseDto.getUserFail();
            }

            String userNickname = dto.getUserNickname();
            userEntity.patchNickname(userNickname);
            userRepository.save(userEntity);

            List<PlanCommentEntity> userComments = planCommentRepository.findByUserEmail(userEmail);
            for (PlanCommentEntity comment : userComments) {
                comment.setUserNickname(userNickname);
            }
            planCommentRepository.saveAll(userComments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserNicknameResponseDto.success();
    }
    
    //? 유저 프로필 사진 변경 (추후 디테일, 페스티벌 댓글도 set추가하기)
    @Override
    public ResponseEntity<? super PatchUserProfileResponseDto> patchUserProfile(String userEmail, PatchUserProfileRequestDto dto) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PatchUserNicknameResponseDto.getUserFail();
            }

            String userProfile = dto.getUserProfile();
            userEntity.patchProfle(userProfile);
            userRepository.save(userEntity);

            List<PlanCommentEntity> userComments = planCommentRepository.findByUserEmail(userEmail);
            for (PlanCommentEntity comment : userComments) {
                comment.setUserProfile(userProfile);
            }
            planCommentRepository.saveAll(userComments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserProfileResponseDto.success();
    }
    
}
