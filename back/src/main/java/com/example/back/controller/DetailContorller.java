package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.service.DetailService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/detail")
@RequiredArgsConstructor
public class DetailContorller {
    
    private final DetailService detailService;

    //? 시군구 코드가 없으면 전체 리스트
    @GetMapping("/list")
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(
        @RequestParam(required = false) String detailSigungucode,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "16") int size
    ) {
        ResponseEntity<? super GetDetailListResponseDto> response = detailService.getDetailList(detailSigungucode, page, size);
        return response;
    } 

}
