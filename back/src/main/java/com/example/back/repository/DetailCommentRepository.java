package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.DetailCommentEntity;

import java.util.List;

public interface DetailCommentRepository extends JpaRepository<DetailCommentEntity, Integer> {
    List<DetailCommentEntity> findByDetailId(int detailId);
}
