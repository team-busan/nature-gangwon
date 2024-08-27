package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.PlanCommentLikeEntity;
import com.example.back.entity.primaryKey.PlanLikePK;

public interface PlanCommentLikeRepository extends JpaRepository<PlanCommentLikeEntity, PlanLikePK> {
    PlanCommentLikeEntity findByUserEmailAndPlanCommentId(String userEmail, int planCommentId);
    @Query("SELECT COUNT(pl) FROM plan_comment_like pl WHERE pl.planCommentId = :planCommentId")
    long countLikesByPlanCommentId(@Param("planCommentId") int planCommentId);
    @Transactional
    public void deleteByPlanCommentId(int planCommentId);
}
