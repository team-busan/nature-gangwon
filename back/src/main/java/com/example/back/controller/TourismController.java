package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.service.LocationService;

@RestController
public class TourismController {

    private final LocationService locationService;

    @Autowired
    public TourismController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/api")
    public String getTourismData(
            @RequestParam String baseUrl,
            @RequestParam String serviceKey,
            @RequestParam int pageNo,
            @RequestParam int numOfRows,
            @RequestParam String MobileApp,
            @RequestParam String MobileOS,
            @RequestParam String arrange,
            @RequestParam int areaCode,
            @RequestParam int contentTypeId) {

        locationService.fetchAndSaveLocations(baseUrl, serviceKey, pageNo, numOfRows, MobileApp, MobileOS, arrange, areaCode, contentTypeId);
        return "Data fetched and saved successfully!";
    }
}