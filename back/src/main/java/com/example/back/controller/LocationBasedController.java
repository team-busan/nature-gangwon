package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.response.location.GetLocationBasedListResponseDto;
import com.example.back.service.LocationBasedService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationBasedController {

    private final LocationBasedService locationBasedService;

    //? 관광지, 축제, 숙박, 음식점 전체 리스트
    //? 파라미터 : contenttypeid 12 관광지, 15 축제, 32 숙박, 39 음식점 각각 리스트
    //? 파라미터 : sigungucode 1-강릉시, 2-고성군, 3-동해시, 4-삼척시, 5-속초시, 6-양구군, 7-양양군, 8-영월군, 9-원주시, 10-인제군, 
    //? 11-정선군, 12-철원군, 13-춘천시, 14-태백시, 15-평창군, 16-홍천군, 17-화천군, 18-횡성군
    //? 추후 인기(조회순)과 평점순(별점) 까지 추가 해야함
    @GetMapping("/list")
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationBasedList(
        @RequestParam(required = false) String locationContenttypeid,
        @RequestParam(required = false) String locationSigungucode
        ) {
        
        ResponseEntity<? super GetLocationBasedListResponseDto> response = locationBasedService.getLocationList(locationContenttypeid, locationSigungucode);
        return response;
    }

}
