package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.back.entity.DetailEntity;

import java.util.List;

public interface DetailRepository extends JpaRepository<DetailEntity, Integer>{
    DetailEntity findByDetailId(int detailId);
    DetailEntity findByDetailContentid(String detailContentid);
    List<DetailEntity> findByDetailSigungucode(String detailSigungucode);
    List<DetailEntity> findByDetailTitleContainingIgnoreCase(String keyword);
    List<DetailEntity> findByDetailSigungucodeAndDetailTitleContainingIgnoreCase(String detailSigungucode, String keyword);

    @Query(value = "SELECT * FROM detail WHERE detail_contenttypeid = :contentTypeId ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<DetailEntity> findRandom3ByContentTypeId(int contentTypeId);
} 