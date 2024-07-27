package com.example.back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.back.dto.response.tourismApi.ApiDetailResponseDto;
import com.example.back.dto.response.tourismApi.LocationFestivalResponseDeto;
import com.example.back.dto.response.tourismApi.LocationTourismResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;

@Service
public class TourismService {
    @Value("${location.tourism.api.url}")
    private String apiUrl;

    @Value("${location.festival.api.url}")
    private String festivalUrl;

    private final RestTemplate restTemplate;

    public TourismService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //? 관광 통합 데이터
    public LocationTourismResponseDto getTourismData(String apiUrl) {
        try {
            URI uri = new URI(apiUrl);

            // Send the request and receive the response as a string
            String jsonString = restTemplate.getForObject(uri, String.class);

            // Convert JSON string to LocationTourismResponseDto
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, LocationTourismResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //? 축제 데이터
    public LocationFestivalResponseDeto getFestivalData(String festivalUrl) {
        try {
            URI uri = new URI(festivalUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, LocationFestivalResponseDeto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //? 관광지 데이터
    public ApiDetailResponseDto getDetailData(String apuUrl) {
        try {
            URI uri = new URI(apiUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, ApiDetailResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }
}
