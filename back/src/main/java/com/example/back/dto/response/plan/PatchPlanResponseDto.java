package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Getter;

@Getter
public class PatchPlanResponseDto extends ResponseDto{
    private PatchPlanResponseDto() {
        super();
    }

    public static ResponseEntity<PatchPlanResponseDto> success() {
        PatchPlanResponseDto responseBody = new PatchPlanResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistPlace() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.IT_DOESNT_EXIST, ResponseMessage.IT_DOESNT_EXIST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notPermissionUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_PERMISSION, ResponseMessage.NOT_PERMISSION);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> invalidId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.INVALID, ResponseMessage.INVALID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}
