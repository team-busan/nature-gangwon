package com.example.back.dto.response.detail;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Getter;

//? 추후 작업하겠습니다. 리포지토리, 컨트롤러, dto필드 서비스 로직 필요
@Getter
public class GetDetailMyMarkListResponseDto extends ResponseDto {
    private GetDetailMyMarkListResponseDto() {
        super();
    }

    public static ResponseEntity<GetDetailMyMarkListResponseDto> success() {
        GetDetailMyMarkListResponseDto responseBody = new GetDetailMyMarkListResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistDetail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
