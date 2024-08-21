package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.detail.PostDetailCommentLikeRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.response.detail.PostDetailCommentResponseDto;
import com.example.back.dto.response.detail.DeleteDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.detail.PostDetailCommentLikeResponseDto;

public interface DetailService {
    ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size);
    ResponseEntity<? super GetDetailResponseDto> getDetail(int detailId);
    ResponseEntity<? super PostDetailCommentResponseDto> postComment(String userEmail, PostDetailCommentRequsetDto dto);
    ResponseEntity<? super PostDetailCommentLikeResponseDto> postDetailCommentLike(String userEmail, PostDetailCommentLikeRequestDto dto);
    ResponseEntity<? super DeleteDetailCommentResponseDto> deleteDetailComment(String userEmail, int commentId, int detailId);
}
