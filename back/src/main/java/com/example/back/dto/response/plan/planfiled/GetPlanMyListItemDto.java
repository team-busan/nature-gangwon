package com.example.back.dto.response.plan.planfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetPlanMyListItemDto {
    private int planId;
    private String planTitle;
    private String startDate;
    private String endDate;
    private String planImage;
}
