package com.example.back.dto.response.detail;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailMarkListItemDto;

import lombok.Getter;

@Getter
public class GetDetailMyMarkListResponseDto extends ResponseDto {
    private List<GetDetailMarkListItemDto> markList;
    private GetDetailMyMarkListResponseDto(List<GetDetailMarkListItemDto> markList) {
        super();
        this.markList = markList;
    }

    public static ResponseEntity<GetDetailMyMarkListResponseDto> success(List<GetDetailMarkListItemDto> markList) {
        GetDetailMyMarkListResponseDto responseBody = new GetDetailMyMarkListResponseDto(markList);
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
