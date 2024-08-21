package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.entity.PhotosEntity;

import java.util.List;

public interface PhotosRepository extends JpaRepository<PhotosEntity, Integer> {
    List<PhotosEntity> findByPlacesId(int placesId);
}
