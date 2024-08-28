package com.example.back.dto.response.plan.planfiled;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetTop3ListItemDto {
    private int planId;
    private String planTitle;
    private int planCount;
    private int markCount;
    private List<String> photoUrls;
}
