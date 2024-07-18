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
@Entity(name = "plan")
@Table(name = "plan")
public class PlanEntity {
    @Id
    private int planId;
    private String userEmail;
    private String startDate;
    private String endDate;
}
