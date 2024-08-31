package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUserEmail(String userEmail);
    boolean existsByUserEmail(String userEmail);
    UserEntity findByUserNickname(String userNickname);
    boolean existsByUserNickname(String userNickname);
    String findByUserProfile(String userProfile);
}
