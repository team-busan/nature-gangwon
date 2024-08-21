package com.example.back.entity;

import com.example.back.entity.primaryKey.DetailLikePK;

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
@Entity(name = "detail_comment_like")
@Table(name = "detail_comment_like")
@IdClass(DetailLikePK.class)
public class DetailCommentLikeEntity {
    @Id
    private String userEmail;

    @Id
    private int detailCommentId;
}
