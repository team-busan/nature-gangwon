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
@Entity(name = "deatil_comment_like")
@Table(name = "deatil_comment_like")
@IdClass(DetailLikePK.class)
public class DetailCommentLikeEntity {
    @Id
    private int userEmail;

    @Id
    private int detailCommentId;
}
