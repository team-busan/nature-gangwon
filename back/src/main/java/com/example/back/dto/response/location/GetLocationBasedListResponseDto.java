package com.example.back.dto.response.location;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.location.locationfiled.GetLocationBasedListItemDto;

import lombok.Getter;

@Getter
public class GetLocationBasedListResponseDto extends ResponseDto {
    private List<GetLocationBasedListItemDto> locationList;
    private long totalData;
    private int totalPage;
    private int currentPage;

    public GetLocationBasedListResponseDto(List<GetLocationBasedListItemDto> locationList, long totalData, int totalPage, int currentPage) {
        super();
        this.locationList = locationList;
        this.totalData = totalData;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
    }

    public static ResponseEntity<GetLocationBasedListResponseDto> success(List<GetLocationBasedListItemDto> locationList , long totalData, int totalPage, int currentPage) {
        GetLocationBasedListResponseDto responseBody = new GetLocationBasedListResponseDto(locationList , totalData, totalPage, currentPage);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getLocationListFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
