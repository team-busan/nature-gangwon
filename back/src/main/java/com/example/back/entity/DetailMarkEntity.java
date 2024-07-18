package com.example.back.entity;

import com.example.back.entity.primaryKey.DetailMarkPK;

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
@Entity(name = "detail_mark")
@Table(name = "detail_mark")
@IdClass(DetailMarkPK.class)
public class DetailMarkEntity {
    @Id
    private String userEmail;
    
    @Id
    private int detailId;
}
