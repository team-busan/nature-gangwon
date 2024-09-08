package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.festival.PatchFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentLikeRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.response.Festival.DeleteFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PatchFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentLikeResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;
import com.example.back.service.FestivalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/festival")
@RequiredArgsConstructor
public class FestivalController {

    private final FestivalService festivalService;
    
    @GetMapping("/list")
    public ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "16") int size
    ){
        ResponseEntity<? super GetFestivalListResponseDto> response = festivalService.getFestivalList(page, size);
        return response;
    }
    
    //? 상세 가져오기
    @GetMapping("/{festivalId}")
    public ResponseEntity<? super GetFestivalResponseDto> getFestival(
        @PathVariable(name = "festivalId") int festivalId,
        @RequestParam(name = "sortOrder", defaultValue = "latest") String sortOrder
    ) {
    return festivalService.getFestival(festivalId, sortOrder);
    }

    //? 댓글작성
    @PostMapping("/post-comment")
    public ResponseEntity<? super PostFestivalCommentResponseDto> postFestivalComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostFestivalCommentRequestDto requestBody
    ){
        ResponseEntity<? super PostFestivalCommentResponseDto> response = festivalService.postFestivalComment(userEmail, requestBody);
        return response;
    }

    //? 댓글 좋아요
    @PostMapping("/comment-like")
    public ResponseEntity<? super PostFestivalCommentLikeResponseDto> postFestvalCommentLike(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostFestivalCommentLikeRequestDto requestBody
    ){
        ResponseEntity<? super PostFestivalCommentLikeResponseDto> response = festivalService.postFestivalCommentLike(userEmail, requestBody);
        return response;
    }

    //? 댓글 삭제
    @DeleteMapping("/delete-comment/{festivalCommentId}")
    public ResponseEntity<? super DeleteFestivalCommentResponseDto> deleteFestivalComment(
        @AuthenticationPrincipal String userEmail,
        @PathVariable(name = "festivalCommentId") int festivalCommentId
    ) {
        ResponseEntity<? super DeleteFestivalCommentResponseDto> response = festivalService.deleteFestivalComment(userEmail, festivalCommentId);
        return response;
    }

    @PatchMapping("/patch-comment")
    public ResponseEntity<? super PatchFestivalCommentResponseDto> patchFestivalComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchFestivalCommentRequestDto requestBody
    ){
        ResponseEntity<? super PatchFestivalCommentResponseDto> response = festivalService.patchFestivalComment(userEmail, requestBody);
        return response;
    }

}
