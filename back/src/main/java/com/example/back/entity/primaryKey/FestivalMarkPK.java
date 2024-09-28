package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class FestivalMarkPK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "festival_id")
    private int festivalId;
}
