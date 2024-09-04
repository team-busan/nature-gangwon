package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalImageEntity;

public interface FestivalImageRepository extends JpaRepository<FestivalImageEntity, Integer>{
    FestivalImageEntity findByFestivalId(int festvalId);
}
