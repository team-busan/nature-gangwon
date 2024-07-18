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
@Entity(name = "detail")
@Table(name = "detail")
public class DetailEntity {
    @Id
    private int detailId;
    private String detailTitle;
    private String detailAddress;
    private String detailTel;
    private BigDecimal detalTotalScore;
    private int views;
    private String detailMapx;
    private String detailMapy;
    private String detailFirstimage;
    private String detailFristimage2;
    private int detailSigungucode;
}
