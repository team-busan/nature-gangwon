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
@Entity(name = "places")
@Table(name = "places")
public class PlacesEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int placesId;
    private int daysId;
    private int locationBasedId;
    private String note;
    private String note2;
    private String sigunguCode;
    private String title;
}
