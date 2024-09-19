package com.example.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailMarkEntity;
import com.example.back.entity.primaryKey.DetailMarkPK;

public interface DetailMarkRepository  extends JpaRepository<DetailMarkEntity, DetailMarkPK>{
    DetailMarkEntity findByUserEmailAndDetailId(String userEmail, int detailId);
    List<DetailMarkEntity> findByUserEmail(String userEmail);
    List<DetailMarkEntity> findByDetailId(int detailId);
    int countByDetailId(int detailId);
}
