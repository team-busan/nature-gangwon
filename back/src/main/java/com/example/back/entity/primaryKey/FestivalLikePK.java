package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class FestivalLikePK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "festival_comment_id")
    private int festivalCommentId;
}
