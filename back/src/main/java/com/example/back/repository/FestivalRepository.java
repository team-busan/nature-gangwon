package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalEntity;

import java.util.List;

public interface FestivalRepository extends JpaRepository<FestivalEntity, Integer> {
    FestivalEntity findByFestivalId(int festivalId);
    FestivalEntity findByFestivalContentid(String festivalContentid);
    List<FestivalEntity> findByFestivalStartDateAfter(String currentDate);
    List<FestivalEntity> findByFestivalStartDateBeforeAndFestivalEndDateAfter(String currentDate, String currentDate2);
    
}