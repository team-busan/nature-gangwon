package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.PlacesEntity;

public interface PlacesRepository extends JpaRepository<PlacesEntity, Integer> {
    
}
