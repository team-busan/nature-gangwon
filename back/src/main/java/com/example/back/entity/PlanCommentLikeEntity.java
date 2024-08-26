package com.example.back.entity;

import com.example.back.entity.primaryKey.PlanLikePK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private String userEmail;

    @Id
    private int planCommentId;

    @ManyToOne
    @JoinColumn(name = "plan_comment_id", insertable = false, updatable = false)
    private PlanCommentEntity planComment;

    public PlanCommentLikeEntity(UserEntity userEntity, int planCommentId) {
        this.userEmail = userEntity.getUserEmail();
        this.planCommentId = planCommentId;
    }
}
