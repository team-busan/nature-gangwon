package com.example.back.dto.response.Festival;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;

import lombok.Data;

@Data
public class DeleteFestivalCommentResponseDto extends ResponseDto{
    public DeleteFestivalCommentResponseDto(){
        super();
    }

    public static ResponseEntity<DeleteFestivalCommentResponseDto> success(){
        DeleteFestivalCommentResponseDto responseBody = new DeleteFestivalCommentResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

    public static ResponseEntity<ResponseDto> existuser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }


    public static ResponseEntity<ResponseDto> deleteCommentFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
