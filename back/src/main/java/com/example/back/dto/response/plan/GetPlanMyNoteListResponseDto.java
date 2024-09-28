package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyNoteListItemDto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetPlanMyNoteListResponseDto extends ResponseDto {
    private List<GetPlanMyNoteListItemDto> myNoteList;

    private GetPlanMyNoteListResponseDto(List<GetPlanMyNoteListItemDto> myNoteList) {
        super();
        this.myNoteList = myNoteList;
    }

    public static ResponseEntity<GetPlanMyNoteListResponseDto> success(List<GetPlanMyNoteListItemDto> myNoteList) {
        GetPlanMyNoteListResponseDto responseBody = new GetPlanMyNoteListResponseDto(myNoteList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
