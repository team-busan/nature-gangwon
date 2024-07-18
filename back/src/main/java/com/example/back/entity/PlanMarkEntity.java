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
@Entity(name = "plan_mark")
@Table(name = "plan_mark")
public class PlanMarkEntity {
    @Id
    private String userEmail;

    @Id
    private int planId;
}
