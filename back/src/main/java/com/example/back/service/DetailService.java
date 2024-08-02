package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.response.detail.GetDetailListResponseDto;

public interface DetailService {
    ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size);
}
