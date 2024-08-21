package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.example.back.entity.DetailCommentLikeEntity;
import com.example.back.entity.primaryKey.DetailLikePK;


@Repository
public interface DetailCommentLikeRepository extends JpaRepository<DetailCommentLikeEntity, DetailLikePK>{
    List<DetailCommentLikeEntity> findByDetailCommentId(int detailCommentId);
    DetailCommentLikeEntity findByUserEmailAndDetailCommentId(String userEmail, int detailCommentId);
    @Transactional
    void deleteByDetailCommentId(int detailCommentId);  
}
