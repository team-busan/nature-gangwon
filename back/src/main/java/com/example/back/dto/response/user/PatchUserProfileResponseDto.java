package com.example.back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Getter;

@Getter
public class PatchUserProfileResponseDto extends ResponseDto{
    private PatchUserProfileResponseDto() {
        super();
    }

    public static ResponseEntity<PatchUserProfileResponseDto> success() {
        PatchUserProfileResponseDto responseBody = new PatchUserProfileResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getUserFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_PERMISSION, ResponseMessage.NOT_PERMISSION);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}
