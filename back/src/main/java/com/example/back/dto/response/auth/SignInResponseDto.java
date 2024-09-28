package com.example.back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto{
    private String token;
    private int expirationTime;

    private SignInResponseDto(String token) {
        super();
        this.token = token;
        this.expirationTime = 3600;
    }

    public static ResponseEntity<SignInResponseDto> success(String token) {
        SignInResponseDto resposneBody = new SignInResponseDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(resposneBody);
    }

    public static ResponseEntity<ResponseDto> singInFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}
