package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.response.detail.GetDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.tourismApi.ApiDescriptionResponseDto.Response;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.service.DetailService;

import jakarta.validation.Valid;

import java.util.List;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/destination")
@RequiredArgsConstructor
public class DetailController {
    
    private final DetailService detailService;

    //? 시군구 코드가 없으면 전체 리스트
    @GetMapping("/list")
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(
        @RequestParam(name = "detailSigungucode", required = false) String detailSigungucode,
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "16") int size
    ) {
        ResponseEntity<? super GetDetailListResponseDto> response = detailService.getDetailList(detailSigungucode, page, size);
        return response;
    }

    //? 특정 관광지 가져오기
    @GetMapping("/{detailId}")
    public ResponseEntity<? super GetDetailResponseDto> getDetail(
        @PathVariable(name = "detailId") int detailId 
    ) {
        return detailService.getDetail(detailId);
    }
    //? 댓글 요청
    @PostMapping("/detail-comment")
    public ResponseEntity<? super GetDetailCommentResponseDto> postComment(
        @AuthenticationPrincipal String userEmail,
        @RequestBody @Valid PostDetailCommentRequsetDto requestBody
    ){
        ResponseEntity<? super GetDetailCommentResponseDto> response = detailService.getComment(userEmail, requestBody);
        return response;

    }
    
}
