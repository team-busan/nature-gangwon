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
public class GetPlanListResponseDto extends ResponseDto {
    private List<GetPlanListItemDto> top4Plans;
    private List<GetPlanListItemDto> allPlans;

    private GetPlanListResponseDto() {
        super();
    }

    public static ResponseEntity<GetPlanListResponseDto> success(List<GetPlanListItemDto> top4Plans, List<GetPlanListItemDto> allPlans) {
        GetPlanListResponseDto responseBody = new GetPlanListResponseDto();
        responseBody.setTop4Plans(top4Plans);
        responseBody.setAllPlans(allPlans);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
