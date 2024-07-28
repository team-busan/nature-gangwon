package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalEntity;
import java.util.Optional;

public interface FestivalRepository extends JpaRepository<FestivalEntity, Integer> {
    Optional<FestivalEntity> findByFestivalId(Integer festivalId);
}