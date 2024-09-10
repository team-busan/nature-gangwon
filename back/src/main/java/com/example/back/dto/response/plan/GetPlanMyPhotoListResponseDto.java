package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyPhotoListItemDto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetPlanMyPhotoListResponseDto extends ResponseDto {
    private List<GetPlanMyPhotoListItemDto> photoList;

    private GetPlanMyPhotoListResponseDto(List<GetPlanMyPhotoListItemDto> photoList) {
        super();
        this.photoList = photoList;
    }

    public static ResponseEntity<GetPlanMyPhotoListResponseDto> success(List<GetPlanMyPhotoListItemDto> photoList) {
        GetPlanMyPhotoListResponseDto responseBody = new GetPlanMyPhotoListResponseDto(photoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto resposneBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resposneBody);
    }
}
