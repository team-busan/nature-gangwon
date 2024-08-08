package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.PlanEntity;

public interface PlanRepository extends JpaRepository<PlanEntity, Integer> {
    
}
