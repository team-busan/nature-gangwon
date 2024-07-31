package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.service.LocationService;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class TourismController {

    private final LocationService locationService;

    @Autowired
    public TourismController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/api/location")
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

    @GetMapping("/api/locaion-festival")
    public String getLocationFestivalData(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey,
        @RequestParam int pageNo,
        @RequestParam int numOfRows,
        @RequestParam String MobileApp,
        @RequestParam String MobileOS,
        @RequestParam String arrange,
        @RequestParam String listYN,
        @RequestParam String eventStartDate,
        @RequestParam String eventEndDate,
        @RequestParam int areaCode) {
            
            locationService.fetchAndSaveLocationsFastival(baseUrl, serviceKey, pageNo, numOfRows, MobileApp, MobileOS, arrange, listYN, eventStartDate ,eventEndDate, areaCode);
            return "Data fetched and saved successfully!";
        }
    
    @GetMapping("/api/detail")
    public String getDetailData(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey,
        @RequestParam int pageNo,
        @RequestParam int numOfRows,
        @RequestParam String MobileApp,
        @RequestParam String MobileOS,
        @RequestParam String arrange,
        @RequestParam int areaCode,
        @RequestParam int contentTypeId) {

        locationService.fetchAndSaveDetail(baseUrl, serviceKey, pageNo, numOfRows, MobileApp, MobileOS, arrange, areaCode, contentTypeId);
        return "Data fetched and saved successfully!";
    }
    
    @GetMapping("/api/festival")
    public String getFestivalData(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey,
        @RequestParam int pageNo,
        @RequestParam int numOfRows,
        @RequestParam String MobileApp,
        @RequestParam String MobileOS,
        @RequestParam String arrange,
        @RequestParam String listYN,
        @RequestParam String eventStartDate,
        @RequestParam String eventEndDate,
        @RequestParam int areaCode) {

            locationService.fetchAndSaveFestival(baseUrl, serviceKey, pageNo, numOfRows, MobileApp, MobileOS, arrange, listYN, eventStartDate ,eventEndDate, areaCode);
            return "Data fetched and saved successfully!";
        }
    
    @GetMapping("/api/festival-images")    
    public String getFestivalImages(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey) {
            List<Integer> festivalIds = getFestivalIds();
            locationService.fetchAndSaveFestivalImages(festivalIds, baseUrl, serviceKey);
            return "Data fetched and saved successfully!";
        }

        private List<Integer> getFestivalIds() {
        return IntStream.rangeClosed(1, 71)
                        .boxed()
                        .collect(Collectors.toList());
    }

    @GetMapping("/api/festival-description")    
    public String getFestivalDescription(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey) {
            List<Integer> festivalIds = getFestivalIds2();
            locationService.fetchAndSaveFestivalDescription(festivalIds, baseUrl, serviceKey);
            return "Data fetched and saved successfully!";
        }

        private List<Integer> getFestivalIds2() {
        return IntStream.rangeClosed(1, 71)
                        .boxed()
                        .collect(Collectors.toList());
    }
    
    @GetMapping("/api/detail-images")    
    public String fetchDedtailImages(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey) {
            List<Integer> detailIds = getDetailIds();
            locationService.fetchAndSaveDetailImages(detailIds, baseUrl, serviceKey);
        return "Data fetched and saved successfully!";
        }

        private List<Integer> getDetailIds() {
        return IntStream.rangeClosed(701, 1427) //* 완 
                        .boxed()
                        .collect(Collectors.toList());
    }

    @GetMapping("/api/detail-description")    
    public String getDetailDescription(
        @RequestParam String baseUrl,
        @RequestParam String serviceKey) {
            List<Integer> detailIds = getDetailIds2();
            locationService.fetchAndSaveDetailDescription(detailIds, baseUrl, serviceKey);
            return "Data fetched and saved successfully!";
        }

        private List<Integer> getDetailIds2() {
        return IntStream.rangeClosed(701, 1427) //* 완
                        .boxed()
                        .collect(Collectors.toList());
    }
}