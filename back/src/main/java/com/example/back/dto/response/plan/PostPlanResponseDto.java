package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Getter;

@Getter
public class PostPlanResponseDto extends ResponseDto{
    private PostPlanResponseDto() {
        super();
    }

    public static ResponseEntity<PostPlanResponseDto> success() {
        PostPlanResponseDto responseBody = new PostPlanResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> postPlanFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.POST_FAIL, ResponseMessage.POST_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> invalidBasedId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.INVALID, ResponseMessage.INVALID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
