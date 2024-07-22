package com.example.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "detail_image")
@Table(name = "detail_image")
public class DetailImageEntity {
    @Id
    private int detailImageId;
    private int detailId;
    private String detailContentid;
    private String detailImage1;
    private String detailImage2;
    private String detailImage3;
    private String detailImage4;
    private String detailImage5;
}
