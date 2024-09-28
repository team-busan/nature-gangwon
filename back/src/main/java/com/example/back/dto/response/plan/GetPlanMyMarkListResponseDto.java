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
public class GetPlanMyMarkListResponseDto extends ResponseDto {
    private List<GetPlanMyListAndMarkItemDto> myMarkList;

    private GetPlanMyMarkListResponseDto(List<GetPlanMyListAndMarkItemDto> myMarkList) {
        super();
        this.myMarkList = myMarkList;
    }

    public static ResponseEntity<GetPlanMyMarkListResponseDto> success(List<GetPlanMyListAndMarkItemDto> myMarkList) {
        GetPlanMyMarkListResponseDto responseBody = new GetPlanMyMarkListResponseDto(myMarkList);
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
