package com.example.back.dto.response.detail;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.DetailCommentLikeEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDetailCommentLikeResponseDto extends ResponseDto{

    private DetailCommentEntity detailCommentEntity;

    private List<DetailCommentLikeEntity> detailCommentLikeList;

    private PostDetailCommentLikeResponseDto(){
        super();
    }

    public static ResponseEntity<PostDetailCommentLikeResponseDto> success(DetailCommentEntity detailCommentEntity, List<DetailCommentLikeEntity> detailCommentLikeList){
        PostDetailCommentLikeResponseDto responseBody = new PostDetailCommentLikeResponseDto();
        responseBody.setDetailCommentEntity(detailCommentEntity);
        responseBody.setDetailCommentLikeList(detailCommentLikeList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existUser(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existDetail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> DetailCommentLikeFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
