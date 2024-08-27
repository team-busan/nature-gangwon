package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlaceListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanCommentListItemDto;
import com.example.back.entity.PlanEntity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetPlanResponseDto extends ResponseDto {
    private PlanEntity planEntity;

    private List<GetPlaceListItemDto> getPlaceListItemDto;

    private List<GetPlanCommentListItemDto> getPlanCommentList;

    private GetPlanResponseDto() {
        super();
    }

    public static ResponseEntity<GetPlanResponseDto> success(PlanEntity planEntity, List<GetPlaceListItemDto> getPlaceListItemDto, List<GetPlanCommentListItemDto> getPlanCommentList) {
        GetPlanResponseDto responseBody = new GetPlanResponseDto();
        responseBody.setPlanEntity(planEntity);
        responseBody.setGetPlaceListItemDto(getPlaceListItemDto);
        responseBody.setGetPlanCommentList(getPlanCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}
