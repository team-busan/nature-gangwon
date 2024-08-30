package com.example.back.dto.response.Festival.Festivalfiled;

import com.example.back.entity.FestivalEntity;
import com.example.back.entity.FestivalImageEntity;

import lombok.Getter;

@Getter
public class GetFestivalImageDto {
    private int festivalId;
    private String festivalContentid;
    private String festivalImage1;
    private String festivalImage2;
    private String festivalImage3;
    private String festivalImage4;
    private String festivalImage5;
    private String festivalImage6;
    private String festivalImage7;

    public GetFestivalImageDto(FestivalEntity festivalEntity, FestivalImageEntity festivalImageEntity){
        this.festivalId = festivalEntity.getFestivalId();
        this.festivalContentid = festivalEntity.getFestivalContentid();
        this.festivalImage1 = festivalEntity.getFestivalFirstimage();
        this.festivalImage2 = festivalEntity.getFestivalFirstimage2();
        this.festivalImage3 = festivalImageEntity.getFestivalImage1();
        this.festivalImage4 = festivalImageEntity.getFestivalImage2();
        this.festivalImage5 = festivalImageEntity.getFestivalImage3();
        this.festivalImage6 = festivalImageEntity.getFestivalImage4();
        this.festivalImage7 = festivalImageEntity.getFestivalImage5();

    }
}
