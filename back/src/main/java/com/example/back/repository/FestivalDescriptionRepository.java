package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalDescriptionEntity;

public interface FestivalDescriptionRepository extends JpaRepository<FestivalDescriptionEntity, Integer>{
    
}
