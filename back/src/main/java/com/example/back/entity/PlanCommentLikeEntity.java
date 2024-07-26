package com.example.back.entity;

import com.example.back.entity.primaryKey.PlanLikePK;

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
@Entity(name = "plan_comment_like")
@Table(name = "plan_comment_like")
@IdClass(PlanLikePK.class)
public class PlanCommentLikeEntity {
    @Id
    private int userEmail;

    @Id
    private int planCommentId;
}
