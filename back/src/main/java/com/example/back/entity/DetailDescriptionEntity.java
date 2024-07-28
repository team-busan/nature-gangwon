package com.example.back.entity;

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
@Entity(name = "detail_description")
@Table(name = "detail_description")
public class DetailDescriptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int detailDescriptionId;
    private int detailId;
    private String detailHomepage;
    private String detailOverview;

    public DetailDescriptionEntity(Integer detailId, String detailHomepage, String detailOverview) {
        this.detailId = detailId;
        this.detailHomepage = detailHomepage;
        this.detailOverview = detailOverview;
    }
}
