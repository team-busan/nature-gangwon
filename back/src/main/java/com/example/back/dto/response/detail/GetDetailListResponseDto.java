package com.example.back.dto.response.detail;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailListItemDto;

import lombok.Getter;

@Getter
public class GetDetailListResponseDto extends ResponseDto {
    private List<GetDetailListItemDto> detailPageList;
    private long totalData;
    private int totalPage;
    private int currentPage;

    public GetDetailListResponseDto(List<GetDetailListItemDto> detailPageList, long totalData, int totalPage, int currentPage) {
        super();
        this.detailPageList = detailPageList;
        this.totalData = totalData;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
    }

    public static ResponseEntity<GetDetailListResponseDto> success(List<GetDetailListItemDto> detailPageList, long totalData, int totalPage, int currentPage) {
        GetDetailListResponseDto responseBody = new GetDetailListResponseDto(detailPageList, totalData, totalPage, currentPage);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getDetailListFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
