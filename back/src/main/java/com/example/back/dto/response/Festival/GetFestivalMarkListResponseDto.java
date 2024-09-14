package com.example.back.dto.response.Festival;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalMarkListItemDto;

import lombok.Getter;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetFestivalMarkListResponseDto extends ResponseDto {
    private List<GetFestivalMarkListItemDto> markList;

    private GetFestivalMarkListResponseDto(List<GetFestivalMarkListItemDto> markList){
        super();
        this.markList = markList;
    }

    public static ResponseEntity<GetFestivalMarkListResponseDto> success(List<GetFestivalMarkListItemDto> markList){
        GetFestivalMarkListResponseDto responseBody = new GetFestivalMarkListResponseDto(markList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistFestival(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
