package com.example.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back.common.CertificationCode;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.auth.CheckCertificationRequestDto;
import com.example.back.dto.request.auth.EmailCertificationRequestDto;
import com.example.back.dto.request.auth.EmailCheckRequestDto;
import com.example.back.dto.request.auth.SignInRequestDto;
import com.example.back.dto.request.auth.SignUpRequestDto;
import com.example.back.dto.request.auth.ValidateNicknameRequestDto;
import com.example.back.dto.response.auth.CheckCertificationResponseDto;
import com.example.back.dto.response.auth.EmailCertificationResponseDto;
import com.example.back.dto.response.auth.EmailCheckResponseDto;
import com.example.back.dto.response.auth.MemberEmailCertificationResponseDto;
import com.example.back.dto.response.auth.SignInResponseDto;
import com.example.back.dto.response.auth.SignUpResponseDto;
import com.example.back.dto.response.auth.ValidateNicknameResponseDto;
import com.example.back.entity.CertificationEntity;
import com.example.back.entity.UserEntity;
import com.example.back.provider.EmailProvider;
import com.example.back.provider.JwtProvider;
import com.example.back.repository.CertificationRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final EmailProvider emailProvider;
    private final CertificationRepository certificationRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    //? 회원가입
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();
            boolean isExistId = userRepository.existsByUserEmail(userEmail);
            if(isExistId) return SignUpResponseDto.duplicateEmail();

            String certificationCode = dto.getCertificationCode();
            CertificationEntity certificationEntity = certificationRepository.findByUserEmail(userEmail);
            boolean isMatched = certificationEntity.getUserEmail().equals(userEmail) && 
            certificationEntity.getCertificationCode().equals(certificationCode);
            if(!isMatched) return SignUpResponseDto.certificationFail();

            String userPassword = dto.getUserPassword();
            String encodePassword = passwordEncoder.encode(userPassword);
            dto.setUserPassword(encodePassword);

            String userNickname = dto.getUserNickname();
            boolean hasNickname = userRepository.existsByUserNickname(userNickname);
            if(hasNickname) {
                return SignUpResponseDto.duplicateNickName();
            }

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            certificationRepository.deleteByUserEmail(userEmail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    //? 로그인
    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        String token = null;
        try {
            String userEmail = dto.getUserEmail();
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) SignInResponseDto.singInFail();

            String userPassword = dto.getUserPassword();
            String encodePassword = userEntity.getUserPassword();
            boolean isMatched = passwordEncoder.matches(userPassword, encodePassword);
            if(!isMatched) return SignInResponseDto.singInFail();

            token = jwtProvider.create(userEmail);
            certificationRepository.deleteByUserEmail(userEmail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);
    }

    //? 이메일 중복체크
    @Override
    public ResponseEntity<? super EmailCheckResponseDto> emailCheck(EmailCheckRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();
            boolean isExistId = userRepository.existsByUserEmail(userEmail);
            if(isExistId) return EmailCheckResponseDto.duplicateEmail();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCheckResponseDto.success();
    }

    //? 인증메일
    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();

            String certificationNumber = CertificationCode.getCertificationNumber();

            boolean isSuccessed = emailProvider.sendCertificationMail(userEmail, certificationNumber);
            if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

            CertificationEntity certificationEntity = new CertificationEntity(0, userEmail, certificationNumber);
            certificationRepository.save(certificationEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCertificationResponseDto.success();
    }

    //? 닉네임 중복체크
    @Override
    public ResponseEntity<? super ValidateNicknameResponseDto> nicknameCheck(ValidateNicknameRequestDto dto) {
        try {
            String userNickname = dto.getUserNickname();
            boolean isExistNickname = userRepository.existsByUserNickname(userNickname);
            if(isExistNickname) return ValidateNicknameResponseDto.duplicateNickname();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ValidateNicknameResponseDto.success();
    }

    //? 인증메일 확인
    @Override
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();
            String certificationCode = dto.getCertificationCode();

            CertificationEntity certificationEntity = certificationRepository.findByUserEmail(userEmail);
            if(certificationEntity == null) return CheckCertificationResponseDto.certificationFail();

            boolean isMatched = certificationEntity.getUserEmail().equals(userEmail) &&
            certificationEntity.getCertificationCode().equals(certificationCode);
            if(!isMatched) return CheckCertificationResponseDto.certificationFail();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CheckCertificationResponseDto.success();
    }

    //? 회원 인증메일
    @Override
    public ResponseEntity<? super MemberEmailCertificationResponseDto> memberEmailCertification(EmailCertificationRequestDto dto) {
        try {
            String userEmail = dto.getUserEmail();
            boolean isExistId = userRepository.existsByUserEmail(dto.getUserEmail());
            if(!isExistId) {
                return MemberEmailCertificationResponseDto.duplicateEmail();
            }

            String certificationNumber = CertificationCode.getCertificationNumber();

            boolean isSuccessed = emailProvider.sendCertificationMail(userEmail, certificationNumber);
            if(!isSuccessed) {
                return MemberEmailCertificationResponseDto.mailSendFail();
            }    

            CertificationEntity certificationEntity = new CertificationEntity(0, userEmail, certificationNumber);
            certificationRepository.save(certificationEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return MemberEmailCertificationResponseDto.success();
    }
}
