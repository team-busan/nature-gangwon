package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.entity.FestivalCommentLIkeEntity;
import com.example.back.entity.primaryKey.FestivalLikePK;

public interface FestivalCommentLikeRepository extends JpaRepository<FestivalCommentLIkeEntity, FestivalLikePK> {
    FestivalCommentLIkeEntity findByUserEmailAndFestivalCommentId(String userEmail, int festivalCommentId);
    @Query("SELECT COUNT(fc) FROM festival_comment_like fc WHERE fc.festivalCommentId = :festivalCommentId")
    long countLikesByFestivalCommentId(@Param("festivalCommentId") int festivalCommentId);
    @Transactional
    public void deleteByFestivalCommentId(int festivalId);
}
