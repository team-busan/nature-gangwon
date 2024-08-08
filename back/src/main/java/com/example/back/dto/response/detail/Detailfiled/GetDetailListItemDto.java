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
    private BigDecimal detailTotalScore;
    private int detailViews;
    private String detailFirstimage;
    private String detailSigungucode;

    public GetDetailListItemDto(DetailEntity detailEntity) {
        this.detailId = detailEntity.getDetailId();
        this.detailTitle = detailEntity.getDetailTitle();
        this.detailContentid = detailEntity.getDetailContentid();
        this.detailAddress = detailEntity.getDetailAddress();
        this.detailTotalScore = detailEntity.getDetailTotalScore();
        this.detailViews = detailEntity.getDetailViews();
        this.detailFirstimage = detailEntity.getDetailFirstimage();
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
