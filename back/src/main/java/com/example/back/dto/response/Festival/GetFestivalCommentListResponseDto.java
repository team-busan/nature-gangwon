package com.example.back.dto.response.Festival;

import lombok.Getter;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalCommentListItemDto;

@Getter
public class GetFestivalCommentListResponseDto extends ResponseDto {
    private List<GetFestivalCommentListItemDto> festivalCommentList;

    private GetFestivalCommentListResponseDto(List<GetFestivalCommentListItemDto> festivalCommentList){
        super();
        this.festivalCommentList = festivalCommentList;
    }

    public static ResponseEntity<GetFestivalCommentListResponseDto> success(List<GetFestivalCommentListItemDto> festivalCommentList){
        GetFestivalCommentListResponseDto responseBody = new GetFestivalCommentListResponseDto(festivalCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistFestival(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_FESTIVAL, ResponseMessage.NOT_EXIST_FESTIVAL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistComment(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.IT_DOESNT_EXIST, ResponseMessage.IT_DOESNT_EXIST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
