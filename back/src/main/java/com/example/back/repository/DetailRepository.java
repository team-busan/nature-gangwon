package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailEntity;
import java.util.Optional;

public interface DetailRepository extends JpaRepository<DetailEntity, Integer>{
    Optional<DetailEntity> findByDetailId(Integer detailId);
} 