package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.CertificationEntity;

import jakarta.transaction.Transactional;

public interface CertificationRepository extends JpaRepository<CertificationEntity, Integer>{
    CertificationEntity findByUserEmail(String userEmail);

    @Transactional
    void deleteByUserEmail(String userEmail);
}
