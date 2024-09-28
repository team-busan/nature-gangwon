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
@Entity(name = "festival_image")
@Table(name = "festival_image")
public class FestivalImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int festivalImageId;
    private int festivalId;
    private String festivalContentid;
    private String festivalImage1;
    private String festivalImage2;
    private String festivalImage3;
    private String festivalImage4;
    private String festivalImage5;
}
