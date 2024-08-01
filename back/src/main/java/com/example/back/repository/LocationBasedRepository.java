package com.example.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.LocationBasedEntity;

public interface LocationBasedRepository extends JpaRepository<LocationBasedEntity, Integer>{
    List<LocationBasedEntity> findByLocationContenttypeid(String locationContenttypeid);
    List<LocationBasedEntity> findByLocationSigungucode(String locationSigungucode);
    List<LocationBasedEntity> findByLocationContenttypeidAndLocationSigungucode(String locationContenttypeid, String locationSigungucode);
}
