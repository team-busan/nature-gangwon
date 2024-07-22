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
@Entity(name = "detail_description")
@Table(name = "detail_description")
public class DetailDescriptionEntity {
    @Id
    private int detailDescriptionId;
    private int detailId;
    private String detailHomepage;
    private String detailOverview;
}
