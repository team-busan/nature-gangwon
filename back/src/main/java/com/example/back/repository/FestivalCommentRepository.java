package com.example.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.FestivalCommentEntity;


public interface FestivalCommentRepository extends JpaRepository<FestivalCommentEntity, Integer>{
    FestivalCommentEntity findByFestivalCommentId(int festivalCommentId);
    List<FestivalCommentEntity> findByFestivalIdOrderByFestivalUploadDateDesc(int festivalId);
    FestivalCommentEntity findByFestivalId(int festivalId);
    int countByFestivalId(int festivalId);
    @Transactional
    public void deleteByFestivalCommentId(int festivalId);
    
    @Query("SELECT fc FROM festival_comment fc WHERE fc.festivalId = :festivalId ORDER BY SIZE(fc.likes) DESC")
    List<FestivalCommentEntity> findByFestivalIdOrderByLikeCountDesc(@Param("festivalId") int festivalId);

    @Query("SELECT fc FROM festival_comment fc WHERE fc.festivalId = :festivalId ORDER BY fc.festivalUploadDate DESC")
    List<FestivalCommentEntity> findByFestivalIdOrderByUploadDateDesc(@Param("festivalId") int festivalId);
}
