package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DetailMarkPK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "detail_id")
    private int detailId;
}
