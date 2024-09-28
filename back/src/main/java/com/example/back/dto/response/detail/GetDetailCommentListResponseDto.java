package com.example.back.dto.response.detail;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailCommentListItemDto;

import lombok.Getter;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetDetailCommentListResponseDto extends ResponseDto {
    private List<GetDetailCommentListItemDto> detailCommentList;

    private GetDetailCommentListResponseDto(List<GetDetailCommentListItemDto> detailCommentList){
        super();
        this.detailCommentList = detailCommentList;
    }

    public static ResponseEntity<GetDetailCommentListResponseDto> success(List<GetDetailCommentListItemDto> detailCommentList){
        GetDetailCommentListResponseDto responseBody = new GetDetailCommentListResponseDto(detailCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> notExistDetail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistComment(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.IT_DOESNT_EXIST, ResponseMessage.IT_DOESNT_EXIST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
