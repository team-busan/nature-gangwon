package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanCommentListItemDto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetPlanCommentListResponseDto extends ResponseDto {
    private List<GetPlanCommentListItemDto> planCommentList;

    private GetPlanCommentListResponseDto(List<GetPlanCommentListItemDto> planCommentList) {
        super();
        this.planCommentList = planCommentList;
    }

    public static ResponseEntity<GetPlanCommentListResponseDto> success(List<GetPlanCommentListItemDto> planCommentList) {
        GetPlanCommentListResponseDto resposneBody = new GetPlanCommentListResponseDto(planCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(resposneBody);
    }

    public static ResponseEntity<ResponseDto> notExistPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistComment() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.IT_DOESNT_EXIST, ResponseMessage.IT_DOESNT_EXIST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
