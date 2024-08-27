package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.PlanEntity;

public interface PlanRepository extends JpaRepository<PlanEntity, Integer> {
    PlanEntity findByPlanId(int planId);
    @Transactional
    public void deleteByPlanId(int planId);
}
