package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;

public interface FestivalService {
    ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(int page, int size);
    ResponseEntity<? super GetFestivalResponseDto> getFestival(int festivalId);
    ResponseEntity<? super PostFestivalCommentResponseDto> postFestivalComment(String userEmail, PostFestivalCommentRequestDto dto);
}   