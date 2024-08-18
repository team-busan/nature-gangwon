package com.example.back.dto.response.detail.Detailfiled;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

import java.math.BigDecimal;

import com.example.back.entity.DetailEntity;
import com.example.back.repository.DetailCommentRepository;

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
    private long detailTotalComment;

    public GetDetailListItemDto(DetailEntity detailEntity, long detailTotalComment) {
        this.detailId = detailEntity.getDetailId();
        this.detailTitle = detailEntity.getDetailTitle();
        this.detailContentid = detailEntity.getDetailContentid();
        this.detailAddress = detailEntity.getDetailAddress();
        this.detailTotalScore = detailEntity.getDetailTotalScore();
        this.detailViews = detailEntity.getDetailViews();
        this.detailFirstimage = detailEntity.getDetailFirstimage();
        this.detailSigungucode = detailEntity.getDetailSigungucode();
        this.detailTotalComment = detailTotalComment;
    }

    public static List<GetDetailListItemDto> copyList(List<DetailEntity> detailEntityList, DetailCommentRepository detailCommentRepository) {
        List<GetDetailListItemDto> list = new ArrayList<>();

        for(DetailEntity detailEntity : detailEntityList) {
            long detailTotalComment = detailCommentRepository.countByDetailId(detailEntity.getDetailId());
            GetDetailListItemDto dto = new GetDetailListItemDto(detailEntity, detailTotalComment);
            list.add(dto);
        }
        return list;
    }
}
