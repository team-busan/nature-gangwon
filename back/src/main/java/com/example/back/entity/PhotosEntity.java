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
@Entity(name = "photos")
@Table(name = "photos")
public class PhotosEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int photosId;
    private int placesId;
    private String photoUrl;
}
