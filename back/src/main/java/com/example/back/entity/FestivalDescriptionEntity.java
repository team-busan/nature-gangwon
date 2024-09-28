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
@Entity(name = "festival_description")
@Table(name = "festival_description")
public class FestivalDescriptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int festivalDescriptionId;
    private int festivalId;
    private String festivalHomepage;
    private String festivalOverview;

    public FestivalDescriptionEntity(Integer festivalId, String festivalHomepage, String festivalOverview) {
        this.festivalId = festivalId;
        this.festivalHomepage = festivalHomepage;
        this.festivalOverview = festivalOverview;
    }
}
