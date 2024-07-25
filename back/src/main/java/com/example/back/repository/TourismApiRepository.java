package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.LocationBasedEntity;

public interface TourismApiRepository extends JpaRepository<LocationBasedEntity, Integer>{
    
}
