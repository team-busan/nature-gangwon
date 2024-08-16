package com.example.back.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.response.detail.GetDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;

public interface DetailService {
    ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size);
    ResponseEntity<? super GetDetailResponseDto> getDetail(int detailId);
    ResponseEntity<? super GetDetailCommentResponseDto> getComment(String userEmail, PostDetailCommentRequsetDto dto);
}
