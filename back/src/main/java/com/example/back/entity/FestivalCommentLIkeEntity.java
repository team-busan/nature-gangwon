package com.example.back.entity;

import com.example.back.entity.primaryKey.FestivalLikePK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "festival_comment_like")
@Table(name = "festival_comment_like")
@IdClass(FestivalLikePK.class)
public class FestivalCommentLIkeEntity {
    @Id
    private String userEmail;

    @Id
    private int festivalCommentId;
}
