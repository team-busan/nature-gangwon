package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import com.example.back.entity.PlanEntity;

import java.util.List;

public interface PlanRepository extends JpaRepository<PlanEntity, Integer> {
    PlanEntity findByPlanId(int planId);
    List<PlanEntity> findByUserEmailOrderByPlanUploadDateDesc(String userEmail);

    List<PlanEntity> findByUserEmailOrderByPlanId(String userEmail);

    @Transactional
    public void deleteByPlanId(int planId);

    List<PlanEntity> findAll(Sort sort);
    List<PlanEntity> findTop3ByOrderByPlanCountDesc();

    List<PlanEntity> findByPlanTitleContaining(String keyword);

    List<PlanEntity> findByStartDateAfter(String currentDate);

    List<PlanEntity> findByStartDateAfterAndPlanTitleContaining(String currentDate, String keyword);

    List<PlanEntity> findByEndDateBefore(String currentDate);

    List<PlanEntity> findByEndDateBeforeAndPlanTitleContaining(String currentDate, String keyword);

    List<PlanEntity> findByStartDateBeforeAndEndDateAfter(String startDate, String endDate);

    List<PlanEntity> findByStartDateBeforeAndEndDateAfterAndPlanTitleContaining(String startDate, String endDate, String keyword);
}
