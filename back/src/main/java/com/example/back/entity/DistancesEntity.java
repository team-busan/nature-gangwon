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
@Entity(name = "distances")
@Table(name = "distances")
public class DistancesEntity {
    @Id
    private int distancesId;
    private int placesId1;
    private int placesId2;
    private int distancesValue;
}
