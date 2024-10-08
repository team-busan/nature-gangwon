package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.PlanMarkEntity;
import com.example.back.entity.primaryKey.PlanMarkPK;

import java.util.List;

public interface PlanMarkRepository extends JpaRepository<PlanMarkEntity, PlanMarkPK>{
    PlanMarkEntity findByUserEmailAndPlanId(String userEmail, int planId);
    List<PlanMarkEntity> findByUserEmail(String userEmail);
    List<PlanMarkEntity> findByPlanId(int planId);
    int countByPlanId(int planId);
    @Transactional
    public void deleteByPlanId(int planId);
}
