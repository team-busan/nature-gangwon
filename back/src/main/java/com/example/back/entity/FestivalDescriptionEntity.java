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
@Entity(name = "festival_description")
@Table(name = "festival_description")
public class FestivalDescriptionEntity {
    @Id
    private int festivalDescriptionId;
    private int festivalId;
    private String festivalHomepage;
    private String festivalOverview;
}
