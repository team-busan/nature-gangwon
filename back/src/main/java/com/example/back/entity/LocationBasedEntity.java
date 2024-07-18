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
@Entity(name = "location_based")
@Table(name = "location_based")
public class LocationBasedEntity {
    @Id
    private int locationBasedId;
    private String locationAddr1;
    private String locationCat1;
    private String locationCat2;
    private String locationCat3;
    private String locationContentid;
    private String locationContenttypeid;
    private String locationFirstimage;
    private String locationFirstimage2;
    private String locationMapx;
    private String locationMapy;
    private int locationSigungucode;
    private String locationTitle;
    private String locationDist;
}
