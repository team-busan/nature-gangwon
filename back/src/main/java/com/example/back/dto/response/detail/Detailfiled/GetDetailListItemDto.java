package com.example.back.dto.response.detail.Detailfiled;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

import java.math.BigDecimal;

import com.example.back.entity.DetailEntity;

@Getter
public class GetDetailListItemDto {
    private int detailId;
    private String detailTitle;
    private String detailContentid;
    private String detailAddress;
    private String detailTel;
    private BigDecimal detailTotalScore;
    private int detailViews;
    private String detailMapx;
    private String detailMapy;
    private String detailFirstimage;
    private String detailFirstimage2;
    private String detailSigungucode;

    public GetDetailListItemDto(DetailEntity detailEntity) {
        this.detailId = detailEntity.getDetailId();
        this.detailTitle = detailEntity.getDetailTitle();
        this.detailContentid = detailEntity.getDetailContentid();
        this.detailAddress = detailEntity.getDetailAddress();
        this.detailTel = detailEntity.getDetailTel();
        this.detailTotalScore = detailEntity.getDetailTotalScore();
        this.detailViews = detailEntity.getDetailViews();
        this.detailMapx = detailEntity.getDetailMapx();
        this.detailMapy = detailEntity.getDetailMapy();
        this.detailFirstimage = detailEntity.getDetailFirstimage();
        this.detailFirstimage2 = detailEntity.getDetailFirstimage2();
        this.detailSigungucode = detailEntity.getDetailSigungucode();
    }

    public static List<GetDetailListItemDto> copyList(List<DetailEntity> detailEntityList) {
        List<GetDetailListItemDto> list = new ArrayList<>();

        for(DetailEntity detailEntity : detailEntityList) {
            GetDetailListItemDto dto = new GetDetailListItemDto(detailEntity);
            list.add(dto);
        }
        return list;
    }
}
