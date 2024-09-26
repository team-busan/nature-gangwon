package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.festival.PatchFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentLikeRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalMarkRequestDto;
import com.example.back.dto.response.Festival.DeleteFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.GetFestivalCommentListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalMarkListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PatchFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentLikeResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalMarkResponseDto;

public interface FestivalService {
    ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(int page, int size, String sortOrder);
    ResponseEntity<? super GetFestivalResponseDto> getFestival(String festivalContentid);
    ResponseEntity<? super PostFestivalCommentResponseDto> postFestivalComment(String userEmail, PostFestivalCommentRequestDto dto);
    ResponseEntity<? super PostFestivalCommentLikeResponseDto> postFestivalCommentLike(String userEmail, PostFestivalCommentLikeRequestDto dto);
    ResponseEntity<? super DeleteFestivalCommentResponseDto> deleteFestivalComment(String userEamil, int festivalCommentId);
    ResponseEntity<? super PatchFestivalCommentResponseDto> patchFestivalComment(String userEamil, PatchFestivalCommentRequestDto dto);
    ResponseEntity<? super PostFestivalMarkResponseDto> postFestivalMark(String userEmail, PostFestivalMarkRequestDto dto);
    ResponseEntity<? super GetFestivalMarkListResponseDto> getFestivalMarkList(String userEmail);
    ResponseEntity<? super GetFestivalCommentListResponseDto> getFestivalCommentList(String festivalContentid, String sortType);
}   