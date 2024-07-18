package com.example.back.entity;

import java.math.BigDecimal;
import jakarta.persistence.Entity;
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
    private int festivalId;
    private String festivalTitle;
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
    private int festivalSigungucode;
}