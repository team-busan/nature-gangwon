package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.FestivalEntity;

public interface FestivalRepository extends JpaRepository<FestivalEntity, Integer> {

}