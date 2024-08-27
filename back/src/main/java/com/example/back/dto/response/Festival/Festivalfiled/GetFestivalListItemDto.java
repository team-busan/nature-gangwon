package com.example.back.dto.response.Festival.Festivalfiled;

import com.example.back.entity.FestivalEntity;

import java.math.BigDecimal;

import java.util.List;
import java.util.ArrayList;


import lombok.Getter;

@Getter
public class GetFestivalListItemDto {
    private int festivalId;
    private String festivalTitle;
    private String festivalAddress;
    private String festivalStartDate;
    private String festivalEndDate;
    private BigDecimal festivalTotalScore;
    private String festivalContentid;
    private int festivalViews;
    private long festivalTotalComment;

    private GetFestivalListItemDto(FestivalEntity festivalEntity, long festivalTotalComment){
        this.festivalId = festivalEntity.getFestivalId();
        this.festivalTitle = festivalEntity.getFestivalTitle();
        this.festivalContentid = festivalEntity.getFestivalContentid();
        this.festivalAddress = festivalEntity.getFestivalAddress();
        this.festivalStartDate = festivalEntity.getFestivalStartDate();
        this.festivalEndDate = festivalEntity.getFestivalEndDate();
        this.festivalTotalScore = festivalEntity.getFestivalTotalScore();
        this.festivalViews = festivalEntity.getFestivalViews();
        this.festivalTotalComment = festivalTotalComment;
    }

    public static List<GetFestivalListItemDto> copyList(List<FestivalEntity> festivalEntityList){
        List<GetFestivalListItemDto> list = new ArrayList<>();
        for(FestivalEntity festivalEntity : festivalEntityList){
            GetFestivalListItemDto dto = new GetFestivalListItemDto(festivalEntity, 0);
            list.add(dto);
        }
        return list;
    }
}
