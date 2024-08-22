package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.PlacesEntity;

import java.util.List;

public interface PlacesRepository extends JpaRepository<PlacesEntity, Integer> {
    List<PlacesEntity> findByPlanId(int planId);
    PlacesEntity findByPlanIdAndLocationBasedId(int planId, int locationBasedId);
}
