package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.PlanCommentEntity;

import java.util.List;

public interface PlanCommentRespository extends JpaRepository<PlanCommentEntity, Integer> {
    PlanCommentEntity findByPlanCommentId(int planCommentId);
    List<PlanCommentEntity> findByPlanIdOrderByPlanUploadDateDesc(int planId);
    @Transactional
    public void deleteByPlanCommentId(int planCommentId);
}
