package com.example.back.dto.response.plan.planfiled;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetPlanListItemDto {
    private int planId;
    private String userNickname;
    private String planTitle;
    private String planUploadDate;
    private int markCount;
    private List<String> photoUrls;
    private int commentCount;
    private String travelStatus;
    private int planCount;
}
