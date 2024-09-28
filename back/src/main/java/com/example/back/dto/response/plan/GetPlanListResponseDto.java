package com.example.back.dto.response.plan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlanListItemDto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetPlanListResponseDto extends ResponseDto {
    private List<GetPlanListItemDto> plans;
    private long totalData;
    private int totalPage;
    private int currentPage;

    public GetPlanListResponseDto(List<GetPlanListItemDto> plans, long totalData, int totalPage, int currentPage) {
        super();
        this.plans = plans;
        this.totalData = totalData;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
    }

    public static ResponseEntity<GetPlanListResponseDto> success(List<GetPlanListItemDto> plans, long totalData, int totalPage, int currentPage) {
        GetPlanListResponseDto responseBody = new GetPlanListResponseDto(plans, totalData, totalPage, currentPage);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existPlan() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_PLAN, ResponseMessage.NOT_EXIST_PLAN);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
