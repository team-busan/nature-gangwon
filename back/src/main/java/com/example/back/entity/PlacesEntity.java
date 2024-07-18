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
@Entity(name = "places")
@Table(name = "places")
public class PlacesEntity {
    @Id
    private int placesId;
    private int daysId;
    private int locationBasedId;
    private String note;
    private int sigunguCode;
    private String title;
}
