package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.DetailCommentEntity;

import java.util.List;

public interface DetailCommentRepository extends JpaRepository<DetailCommentEntity, Integer> {
    List<DetailCommentEntity> findByDetailId(int detailId);
    long countByDetailId(int detailId);
    DetailCommentEntity findByDetailCommentId(int detailCommentId);
    
    @Transactional
    public void deleteByDetailId(int detailId);

    @Transactional
    public void deleteByDetailCommentId(int detailCommentId);
}
