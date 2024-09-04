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

import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
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

    @GetMapping("/{festivalId}")
    public ResponseEntity<? super GetFestivalResponseDto> getFestival(
        @PathVariable(name = "festivalId") int festivalId
    )
    {
        return festivalService.getFestival(festivalId);
    }

    @PostMapping("/post-comment")
    public ResponseEntity<? super PostFestivalCommentResponseDto> postFestivalComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostFestivalCommentRequestDto requestBody
    ){
        ResponseEntity<? super PostFestivalCommentResponseDto> response = festivalService.postFestivalComment(userEmail, requestBody);
        return response;
    }
}
