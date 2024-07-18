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
@Entity(name = "festival_comment")
@Table(name = "festival_comment")
public class FestivalCommentEntity {
    @Id
    private int festivalCommentId;
    private int festivalId;
    private String userEmail;
    private String userNickname;
    private String userProfile;
    private String festivalContent;
    private int score;
}
