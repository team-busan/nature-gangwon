package com.example.back.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalEntity;

import java.util.List;

public interface FestivalRepository extends JpaRepository<FestivalEntity, Integer> {
    Page<FestivalEntity> findByFestivalStartDateAfter(String currentDate, Pageable pageable);
     // 현재 진행 중인 축제(현재 날짜가 시작일과 종료일 사이에 있는 경우)
    List<FestivalEntity> findByFestivalStartDateBeforeAndFestivalEndDateAfter(String currentDate, String currentDate2);
    
}