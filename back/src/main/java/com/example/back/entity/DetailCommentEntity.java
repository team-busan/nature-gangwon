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
@Entity(name = "detail_comment")
@Table(name = "detail_comment")
public class DetailCommentEntity {
    @Id
    private int detailCommentId;
    private int detailId;
    private String userEmail;
    private String userNickname;
    private String userProfil;
    private String detailContent;
    private int score;
}
