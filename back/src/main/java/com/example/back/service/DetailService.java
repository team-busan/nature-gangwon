package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;

public interface DetailService {
    ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size);
    ResponseEntity<? super GetDetailResponseDto> getDetail(int detailId); 
}
