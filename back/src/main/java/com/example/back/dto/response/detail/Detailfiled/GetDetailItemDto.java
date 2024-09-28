package com.example.back.dto.response.detail.Detailfiled;

import java.math.BigDecimal;

import com.example.back.entity.DetailEntity;
import com.example.back.repository.DetailCommentRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetDetailItemDto {
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
    private long detailTotalComment;

    public GetDetailItemDto(DetailEntity detailEntity, DetailCommentRepository detailCommentRepository){
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
        this.detailTotalComment = detailCommentRepository.countByDetailId(detailEntity.getDetailId());
    }
}
