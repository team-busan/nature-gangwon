package com.example.back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.back.common.ResponseCode;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.auth.SignUpResponseDto;

import lombok.Getter;

@Getter
public class ValidateNicknameResponseDto extends ResponseDto{
    private boolean result;

    private ValidateNicknameResponseDto() {
        super();
    }

    public static ResponseEntity<? super SignUpResponseDto> success() {
        ValidateNicknameResponseDto responseBody = new ValidateNicknameResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> existNickname() {
        ResponseDto responseBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> validateNicknameFail() {
        ResponseDto resposneBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resposneBody);
    }
}
