package com.example.back.dto.response.detail;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailRandom3ListItemDto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetDetailRandom3ListResponseDto extends ResponseDto {
    private List<GetDetailRandom3ListItemDto> getDetailRandom3ListItemDto;

    private GetDetailRandom3ListResponseDto(List<GetDetailRandom3ListItemDto> getDetailRandom3ListItemDto) {
        super();
        this.getDetailRandom3ListItemDto = getDetailRandom3ListItemDto;
    }

    public static ResponseEntity<GetDetailRandom3ListResponseDto> success(List<GetDetailRandom3ListItemDto> getDetailRandom3ListItemDto) {
        GetDetailRandom3ListResponseDto responseBody = new GetDetailRandom3ListResponseDto(getDetailRandom3ListItemDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistDetail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
