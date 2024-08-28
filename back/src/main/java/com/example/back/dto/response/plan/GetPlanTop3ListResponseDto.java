package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanListItemDto;

import lombok.Data;

import java.util.List;

@Data
public class GetPlanTop3ListResponseDto extends ResponseDto {
    private List<GetPlanListItemDto> top3List;

    private GetPlanTop3ListResponseDto() {
        super();
    }

    public static ResponseEntity<GetPlanTop3ListResponseDto> success(List<GetPlanListItemDto> top3List) {
        GetPlanTop3ListResponseDto responseBody = new GetPlanTop3ListResponseDto();
        responseBody.setTop3List(top3List);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
