package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailEntity;

public interface DetailRepository extends JpaRepository<DetailEntity, Integer>{
    
} 