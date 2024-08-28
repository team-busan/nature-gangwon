package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<PlanEntity> findByStartDateAfter(String currentDate, Pageable pageable);
    Page<PlanEntity> findByEndDateBefore(String currentDate, Pageable pageable);
    Page<PlanEntity> findByStartDateBeforeAndEndDateAfter(String currentDate, String currentDate2, Pageable pageable);

}
