package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.response.location.GetLocationBasedListResponseDto;

public interface LocationBasedService {
    ResponseEntity<? super GetLocationBasedListResponseDto> getLocationList(String locationContenttypeid, String locationSigungucode, int page, int size);
}
