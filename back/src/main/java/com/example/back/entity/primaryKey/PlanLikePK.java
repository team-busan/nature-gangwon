package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlanLikePK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "plan_comment_id")
    private int planCommentId;
}
