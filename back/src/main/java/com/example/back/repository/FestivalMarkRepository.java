package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalMarkEntity;
import com.example.back.entity.primaryKey.FestivalMarkPK;

import java.util.List;

public interface FestivalMarkRepository extends JpaRepository<FestivalMarkEntity, FestivalMarkPK> {
    FestivalMarkEntity findByUserEmailAndFestivalId(String userEmail, int festivalId);
    List<FestivalMarkEntity> findByUserEmail(String userEmail);
    int countByFestivalId(int festivalId);
}
