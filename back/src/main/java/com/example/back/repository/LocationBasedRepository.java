package com.example.back.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.back.entity.LocationBasedEntity;

public interface LocationBasedRepository extends JpaRepository<LocationBasedEntity, Integer>{
    LocationBasedEntity findByLocationBasedId(int locationBasedId);
    @Query(value = "SELECT * FROM location_based ORDER BY RAND()", nativeQuery = true)
    Page<LocationBasedEntity> findAllRandom(Pageable pageable);
    Page<LocationBasedEntity> findByLocationContenttypeid(String locationContenttypeid, Pageable pageable);
    Page<LocationBasedEntity> findByLocationSigungucode(String locationSigungucode, Pageable pageable);
    Page<LocationBasedEntity> findByLocationContenttypeidAndLocationSigungucode(String locationContenttypeid, String locationSigungucode, Pageable pageable);
    Page<LocationBasedEntity> findByLocationAddr1ContainingOrLocationTitleContaining(String locationAddr1, String locationTitle, Pageable pageable);
    // 키워드로 locationAdd1과 locationTitle 필드를 동시에 검색
    Page<LocationBasedEntity> findByLocationAddr1ContainingOrLocationTitleContainingAndLocationContenttypeidAndLocationSigungucode(
        String locationAdd1, String locationTitle, String locationContenttypeid, String locationSigungucode, Pageable pageable);

    Page<LocationBasedEntity> findByLocationAddr1ContainingOrLocationTitleContainingAndLocationContenttypeid(
        String locationAdd1, String locationTitle, String locationContenttypeid, Pageable pageable);

    Page<LocationBasedEntity> findByLocationAddr1ContainingOrLocationTitleContainingAndLocationSigungucode(
        String locationAdd1, String locationTitle, String locationSigungucode, Pageable pageable);
}
