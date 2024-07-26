package com.example.back.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DetailLikePK {
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "detail_comment_id")
    private int detailCommentId;
}
