package com.example.back.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.user.PatchUserNicknameRequestDto;
import com.example.back.dto.request.user.PatchUserPasswordRequestDto;
import com.example.back.dto.request.user.PatchUserProfileRequestDto;
import com.example.back.dto.response.user.GetUserResponseDto;
import com.example.back.dto.response.user.PatchUserNicknameResponseDto;
import com.example.back.dto.response.user.PatchUserPasswordResponseDto;
import com.example.back.dto.response.user.PatchUserProfileResponseDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.FestivalCommentEntity;
import com.example.back.entity.PlanCommentEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.CertificationRepository;
import com.example.back.repository.DetailCommentRepository;
import com.example.back.repository.FestivalCommentRepository;
import com.example.back.repository.PlanCommentRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplemet implements UserService{

    private final UserRepository userRepository;

    private final PlanCommentRepository planCommentRepository;

    private final DetailCommentRepository detailCommentRepository;

    private final FestivalCommentRepository festivalCommentRepository;

    private final CertificationRepository certificationRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    //? 유저 닉네임 수정하기
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

            List<DetailCommentEntity> userDetailComments = detailCommentRepository.findByUserEmail(userEmail);
            for(DetailCommentEntity comment : userDetailComments) {
                comment.setUserNickname(userNickname);
            }

            List<FestivalCommentEntity> userFestivalComments = festivalCommentRepository.findByUserEmail(userEmail);
            for(FestivalCommentEntity comment : userFestivalComments) {
                comment.setUserNickname(userNickname);
            }

            planCommentRepository.saveAll(userComments);
            detailCommentRepository.saveAll(userDetailComments);
            festivalCommentRepository.saveAll(userFestivalComments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserNicknameResponseDto.success();
    }
    
    //? 유저 프로필 사진 변경
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
            for (PlanCommentEntity profile : userComments) {
                profile.setUserProfile(userProfile);
            }

            List<DetailCommentEntity> detailUserComments = detailCommentRepository.findByUserEmail(userEmail);
            for(DetailCommentEntity profile : detailUserComments) {
                profile.setUserProfile(userProfile);
            }

            List<FestivalCommentEntity> festivalUserComments = festivalCommentRepository.findByUserEmail(userEmail);
            for(FestivalCommentEntity profile : festivalUserComments) {
                profile.setUserProfile(userProfile);
            }

            planCommentRepository.saveAll(userComments);
            detailCommentRepository.saveAll(detailUserComments);
            festivalCommentRepository.saveAll(festivalUserComments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserProfileResponseDto.success();
    }

    //? 유저 비밀번호 변경
    @Override
    public ResponseEntity<? super PatchUserPasswordResponseDto> patchUserPassword(PatchUserPasswordRequestDto dto) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(dto.getUserEmail());
            if (userEntity == null) {
                return PatchUserPasswordResponseDto.getUserFail();
            }

            String encodedPassword = passwordEncoder.encode(dto.getUserPassword());

            userEntity.patchPassword(encodedPassword);
            userRepository.save(userEntity);
            
            certificationRepository.deleteByUserEmail(dto.getUserEmail());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserPasswordResponseDto.success();
    }

}
