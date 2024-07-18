package com.example.back.entity;

import com.example.back.entity.primaryKey.FestivalMarkPK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "festival_mark")
@Table(name = "festival_mark")
@IdClass(FestivalMarkPK.class)
public class FestivalMarkEntity {
    @Id
    private String userEmail;
    
    @Id
    private int festivalId;
}
