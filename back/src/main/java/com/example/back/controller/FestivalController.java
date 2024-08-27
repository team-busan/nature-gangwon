package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.service.FestivalService;

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
}
