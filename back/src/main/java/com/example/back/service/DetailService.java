package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.detail.PatchDetailCommentRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentLikeRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.request.detail.PostDetailMarkRequestDto;
import com.example.back.dto.response.detail.PostDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailMarkResponseDto;
import com.example.back.dto.response.detail.DeleteDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailCommentListResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailMyMarkListResponseDto;
import com.example.back.dto.response.detail.GetDetailRandom3ListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.detail.PatchDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailCommentLikeResponseDto;

public interface DetailService {
    ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, String searchKeyword, int page, int size);
    ResponseEntity<? super GetDetailResponseDto> getDetail(int detailId);
    ResponseEntity<? super PostDetailCommentResponseDto> postComment(String userEmail, PostDetailCommentRequsetDto dto);
    ResponseEntity<? super PostDetailCommentLikeResponseDto> postDetailCommentLike(String userEmail, PostDetailCommentLikeRequestDto dto);
    ResponseEntity<? super DeleteDetailCommentResponseDto> deleteDetailComment(String userEmail, int detailCommentId);
    ResponseEntity<? super GetDetailRandom3ListResponseDto> getRandom3List();
    ResponseEntity<? super PostDetailMarkResponseDto> postDetailMark(String userEmail, PostDetailMarkRequestDto dto);
    ResponseEntity<? super GetDetailMyMarkListResponseDto> getDetailMarkList(String userEmail);
    ResponseEntity<? super PatchDetailCommentResponseDto> patchDetailComment(String userEmail, PatchDetailCommentRequestDto dto);
    ResponseEntity<? super GetDetailCommentListResponseDto> getDetailCommentList(int detailId, String sortType);
}
