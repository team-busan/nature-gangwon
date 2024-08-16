package com.example.back.dto.response.detail;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.DetailEntity;

import lombok.Data;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
public class GetDetailCommentResponseDto extends ResponseDto{
    private DetailEntity detailEntity;
    private List<DetailCommentEntity> detailCommentList;
    private GetDetailCommentResponseDto(){
        super();
    }

    public static ResponseEntity<GetDetailCommentResponseDto> success(DetailEntity detailEntity, List<DetailCommentEntity> detailCommentList ){
        GetDetailCommentResponseDto responseBody = new GetDetailCommentResponseDto();
        responseBody.setDetailEntity(detailEntity);
        responseBody.setDetailCommentList(detailCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existUser(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> postCommentFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_COMMENT, ResponseMessage.NOT_EXIST_COMMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> exxistPost() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
