package com.example.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.FestivalCommentEntity;


public interface FestivalCommentRepository extends JpaRepository<FestivalCommentEntity, Integer>{
    FestivalCommentEntity findByFestivalCommentId(int festivalCommentId);
    List<FestivalCommentEntity> findByFestivalIdOrderByFestivalUploadDateDesc(int festivalId);
    FestivalCommentEntity findByFestivalId(int festivalId);
    int countByFestivalId(int festivalId);
    @Transactional
    public void deleteByFestivalCommentId(int festivalId);
    

}
