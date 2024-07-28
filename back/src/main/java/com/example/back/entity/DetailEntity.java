package com.example.back.entity;

import java.math.BigDecimal;
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
@Entity(name = "detail")
@Table(name = "detail")
public class DetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public DetailEntity(
            int detailId, 
            String detailTitle, 
            String detailContentid, 
            String detailAddress, 
            String detailTel, 
            String detailMapx, 
            String detailMapy, 
            String detailFirstimage, 
            String detailFirstimage2, 
            String detailSigungucode) {
        this.detailId = detailId;
        this.detailTitle = detailTitle;
        this.detailContentid = detailContentid;
        this.detailAddress = detailAddress;
        this.detailTel = detailTel;
        this.detailTotalScore = BigDecimal.ZERO; // 기본값 설정
        this.detailViews = 0; // 기본값 설정
        this.detailMapx = detailMapx;
        this.detailMapy = detailMapy;
        this.detailFirstimage = detailFirstimage;
        this.detailFirstimage2 = detailFirstimage2;
        this.detailSigungucode = detailSigungucode;
    }

    public void increaseViewCount() {
        this.detailViews++;
    }
}
