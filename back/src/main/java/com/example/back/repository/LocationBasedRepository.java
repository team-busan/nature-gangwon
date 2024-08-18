package com.example.back.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.LocationBasedEntity;

public interface LocationBasedRepository extends JpaRepository<LocationBasedEntity, Integer>{
    LocationBasedEntity findByLocationBasedId(int locationBasedId);
    Page<LocationBasedEntity> findByLocationContenttypeid(String locationContenttypeid, Pageable pageable);
    Page<LocationBasedEntity> findByLocationSigungucode(String locationSigungucode, Pageable pageable);
    Page<LocationBasedEntity> findByLocationContenttypeidAndLocationSigungucode(String locationContenttypeid, String locationSigungucode, Pageable pageable);
}
