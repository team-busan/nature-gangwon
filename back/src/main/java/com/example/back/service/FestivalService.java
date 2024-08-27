package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.response.Festival.GetFestivalListResponseDto;

public interface FestivalService {
    ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(int page, int size);
}