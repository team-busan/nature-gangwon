package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.back.entity.DetailEntity;

import java.util.List;

public interface DetailRepository extends JpaRepository<DetailEntity, Integer>{
    DetailEntity findByDetailId(int detailId);
    Page<DetailEntity> findByDetailSigungucode(String detailSigungucode, Pageable pageable);

    @Query(value = "SELECT * FROM detail WHERE detail_contenttypeid = :contentTypeId ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<DetailEntity> findRandom3ByContentTypeId(int contentTypeId);
} 