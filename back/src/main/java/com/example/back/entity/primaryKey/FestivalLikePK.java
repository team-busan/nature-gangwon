package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FestivalLikePK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "festival_comment_id")
    private int festivalCommentId;
}
