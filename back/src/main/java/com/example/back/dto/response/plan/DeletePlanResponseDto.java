package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Data;

@Data
public class DeletePlanResponseDto extends ResponseDto {
    public DeletePlanResponseDto() {
        super();
    }

    public static ResponseEntity<DeletePlanResponseDto> success() {
        DeletePlanResponseDto responseBody = new DeletePlanResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
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
