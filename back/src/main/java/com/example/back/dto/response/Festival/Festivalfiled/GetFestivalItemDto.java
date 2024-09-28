package com.example.back.dto.response.Festival.Festivalfiled;

import java.math.BigDecimal;

import com.example.back.entity.FestivalEntity;
import com.example.back.repository.FestivalCommentRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetFestivalItemDto {
    private int festivalId;
    private String festivalTitle;
    private String festivalContentid;
    private String festivalAddress;
    private String festivalTel;
    private String festivalStartDate;
    private String festivalEndDate;
    private BigDecimal festivalTotalScore;
    private int festivalViews;
    private String festivalMapx;
    private String festivalMapy;
    private String festivalFirstimage;
    private String festivalFirstimage2;
    private String festivalSigungucode;
    private long festivalTotalComment;

    public GetFestivalItemDto(FestivalEntity festivalEntity, FestivalCommentRepository festivalCommentRepository){
        this.festivalId = festivalEntity.getFestivalId();
        this.festivalTitle = festivalEntity.getFestivalTitle();
        this.festivalContentid = festivalEntity.getFestivalContentid();
        this.festivalAddress = festivalEntity.getFestivalAddress();
        this.festivalTel = festivalEntity.getFestivalTel();
        this.festivalStartDate = festivalEntity.getFestivalStartDate();
        this.festivalEndDate = festivalEntity.getFestivalEndDate();
        this.festivalTotalScore = festivalEntity.getFestivalTotalScore();
        this.festivalViews = festivalEntity.getFestivalViews();
        this.festivalMapx = festivalEntity.getFestivalMapx();
        this.festivalMapy = festivalEntity.getFestivalMapy();
        this.festivalFirstimage = festivalEntity.getFestivalFirstimage();
        this.festivalFirstimage2 = festivalEntity.getFestivalFirstimage2();
        this.festivalSigungucode = festivalEntity.getFestivalSigungucode();
        this.festivalTotalComment = festivalCommentRepository.countByFestivalId(festivalEntity.getFestivalId());

    }
}
