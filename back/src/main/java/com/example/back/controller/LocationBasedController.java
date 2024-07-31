package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.response.location.GetLocationBasedListResponseDto;
import com.example.back.service.LocationBasedService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationBasedController {

    private final LocationBasedService locationBasedService;

    @GetMapping("/list")
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationBasedList() {
        ResponseEntity<? super GetLocationBasedListResponseDto> response = locationBasedService.getLocationList();
        return response;
    }

    @GetMapping("/area-list")
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationBasedListByType(
        @RequestParam String locationContenttypeid
        ) {
            System.out.println("Received locationContenttypeid: " + locationContenttypeid);
        ResponseEntity<? super GetLocationBasedListResponseDto> response = locationBasedService.getLocationAreaList(locationContenttypeid);
        return response;
    }
}
