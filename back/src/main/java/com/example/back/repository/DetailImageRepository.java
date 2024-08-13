package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailImageEntity;

public interface DetailImageRepository extends JpaRepository<DetailImageEntity, Integer> {
    DetailImageEntity findByDetailId(int detailId);
}
