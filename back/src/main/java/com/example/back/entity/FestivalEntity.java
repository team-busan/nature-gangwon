package com.example.back.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "festival")
@Table(name = "festival")
public class FestivalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public FestivalEntity(
            int festivalId, 
            String festivalTitle,
            String festivalContentid, 
            String festivalAddress, 
            String festivalTel, 
            String festivalStartDate, 
            String festivalEndDate, 
            String festivalMapx, 
            String festivalMapy, 
            String festivalFirstimage,
            String festivalFirstimage2, 
            String festivalSigungucode) {
        this.festivalId = festivalId;
        this.festivalTitle = festivalTitle;
        this.festivalContentid = festivalContentid;
        this.festivalAddress = festivalAddress;
        this.festivalTel = festivalTel;
        this.festivalStartDate = festivalStartDate;
        this.festivalEndDate = festivalEndDate;
        this.festivalTotalScore = BigDecimal.ZERO;
        this.festivalViews = 0;
        this.festivalMapx = festivalMapx;
        this.festivalMapy = festivalMapy;
        this.festivalFirstimage = festivalFirstimage;
        this.festivalFirstimage2 = festivalFirstimage2;
        this.festivalSigungucode = festivalSigungucode;
    }
    
    public LocalDate getEndDateAsLocalDate() {
        return LocalDate.parse(this.festivalEndDate, DateTimeFormatter.ISO_DATE);
    }

    public void increaseViewCount() {
        this.festivalViews++;
    }
}