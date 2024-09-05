package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyListAndMarkItemDto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetPlanMyListResponseDto extends ResponseDto{
    private List<GetPlanMyListAndMarkItemDto> myList;

    private GetPlanMyListResponseDto(List<GetPlanMyListAndMarkItemDto> myList) {
        super();
        this.myList = myList;
    }

    public static ResponseEntity<GetPlanMyListResponseDto> success(List<GetPlanMyListAndMarkItemDto> myList) {
        GetPlanMyListResponseDto responseBody = new GetPlanMyListResponseDto(myList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_PERMISSION, ResponseMessage.NOT_PERMISSION);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistPlan() {
        ResponseDto responsebody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsebody);
    }
}
