package com.example.back.dto.response.plan.planfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetPlanMyPhotoListItemDto {
    private int planId;
    private String planTitle;
    List<String> photoUrls;
}
