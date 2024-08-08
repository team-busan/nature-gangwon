package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DaysEntity;

public interface DaysRepository extends JpaRepository<DaysEntity, Integer>{
    
}
