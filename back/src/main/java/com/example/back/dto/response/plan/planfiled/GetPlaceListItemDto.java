package com.example.back.dto.response.plan.planfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetPlaceListItemDto {
    private int placeId;
    private int planId;
    private int locationBasedId;
    private String locationContenttypeid;
    private int dayNumber;
    private String note;
    private String note2;
    private String placeAdd1;
    private String title;
    private String locationFirstimage;
    private String mapx;
    private String mapy;
    private List<String> photoUrls;
}