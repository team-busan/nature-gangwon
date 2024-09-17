package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.example.back.entity.DetailCommentLikeEntity;
import com.example.back.entity.primaryKey.DetailLikePK;


@Repository
public interface DetailCommentLikeRepository extends JpaRepository<DetailCommentLikeEntity, DetailLikePK>{
    DetailCommentLikeEntity findByUserEmailAndDetailCommentId(String userEmail, int detailCommentId);
    @Query("SELECT COUNT(dc) FROM detail_comment_like dc WHERE dc.detailCommentId = :detailCommentId")
    long countLikesByDetailCommentId(@Param("detailCommentId") int detailCommentId);
    @Transactional
    void deleteByDetailCommentId(int detailCommentId);  
    List<DetailCommentLikeEntity> findByDetailCommentId(int detailCommentId);

}
