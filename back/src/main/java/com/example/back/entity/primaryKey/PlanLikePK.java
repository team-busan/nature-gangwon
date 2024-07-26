package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class PlanLikePK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "plan_comment_id")
    private int planCommentId;
}
