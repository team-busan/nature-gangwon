package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.back.entity.DetailEntity;

import java.util.Optional;
import java.util.List;

public interface DetailRepository extends JpaRepository<DetailEntity, Integer>{
    Optional<DetailEntity> findByDetailId(Integer detailId);
    //List<DetailEntity> findByDetailSigungucode(String detailSigungucode);
    Page<DetailEntity> findByDetailSigungucode(String detailSigungucode, Pageable pageable);
} 