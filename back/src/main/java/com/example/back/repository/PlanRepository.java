package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import com.example.back.entity.PlanEntity;

import java.util.List;

public interface PlanRepository extends JpaRepository<PlanEntity, Integer> {
    PlanEntity findByPlanId(int planId);

    @Transactional
    public void deleteByPlanId(int planId);

    List<PlanEntity> findAll(Sort sort);
    List<PlanEntity> findTop3ByOrderByPlanCountDesc();
}
