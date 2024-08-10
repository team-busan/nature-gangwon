package com.example.back.dto.response.plan.planfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetPlaceListItemDto {
    private int planId;
    private int locationBasedId;
    private int dayNumber;
    private String note;
    private String note2;
    private String placeAdd1;
    private String title;
    private String mapx;
    private String mapy;
}