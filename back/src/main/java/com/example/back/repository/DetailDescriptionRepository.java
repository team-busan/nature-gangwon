package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailDescriptionEntity;

public interface DetailDescriptionRepository extends JpaRepository<DetailDescriptionEntity, Integer> {
    DetailDescriptionEntity findByDetailId(Integer detailId);
} 