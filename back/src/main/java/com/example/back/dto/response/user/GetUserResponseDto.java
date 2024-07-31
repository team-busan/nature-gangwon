package com.example.back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.entity.UserEntity;

public class GetUserResponseDto extends ResponseDto {
    private String userEmail;
    private String userNickname;
    private String userProfile;

    private GetUserResponseDto(UserEntity userEntity) {
        super();
        this.userEmail = userEntity.getUserEmail();
        this.userNickname = userEntity.getUserNickname();
        this.userProfile = userEntity.getUserProfile();
    }

    public static ResponseEntity<GetUserResponseDto> success(UserEntity userEntity) {
        GetUserResponseDto responseBody = new GetUserResponseDto(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getUserFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
