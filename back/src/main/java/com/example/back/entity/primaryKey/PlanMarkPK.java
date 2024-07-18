package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class PlanMarkPK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "plan_id")
    private int planId;
}
