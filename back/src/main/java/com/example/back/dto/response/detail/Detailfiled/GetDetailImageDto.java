package com.example.back.dto.response.detail.Detailfiled;

import lombok.AllArgsConstructor;
import lombok.Getter;

import com.example.back.entity.DetailEntity;
import com.example.back.entity.DetailImageEntity;


@Getter
@AllArgsConstructor
public class GetDetailImageDto {
    private int detailId;
    private String detailContentid;
    private String detailImage1;
    private String detailImage2;
    private String detailImage3;
    private String detailImage4;
    private String detailImage5;
    private String detailImage6;
    private String detailImage7;

    public GetDetailImageDto(DetailEntity detailEntity, DetailImageEntity detailImageEntity ){
        this.detailId = detailEntity.getDetailId();
        this.detailContentid = detailEntity.getDetailContentid();
        this.detailImage1 = detailEntity.getDetailFirstimage();
        this.detailImage2 = detailEntity.getDetailFirstimage2();
        this.detailImage3 = detailImageEntity.getDetailImage1();
        this.detailImage4 = detailImageEntity.getDetailImage2();
        this.detailImage5 = detailImageEntity.getDetailImage3();
        this.detailImage6 = detailImageEntity.getDetailImage4();
        this.detailImage7 = detailImageEntity.getDetailImage5();
    }
}
