package com.example.back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.back.dto.response.tourismApi.ApiDetailResponseDto;
import com.example.back.dto.response.tourismApi.ApiFestivalDescriptionResponseDto;
import com.example.back.dto.response.tourismApi.ApiFestivalImageResponseDto;
import com.example.back.dto.response.tourismApi.LocationFestivalResponseDto;
import com.example.back.dto.response.tourismApi.LocationTourismResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;

@Service
public class TourismService {
    @Value("${location.tourism.api.url}")
    private String apiUrl;

    @Value("${location.festival.api.url}")
    private String festivalUrl;

    @Value("&{location.image.api.url}")
    private String imageUrl;

    @Value("&{location.description.api.url}")
    private String descriptionUrl;

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
    public LocationFestivalResponseDto getFestivalData(String festivalUrl) {
        try {
            URI uri = new URI(festivalUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, LocationFestivalResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //? 관광지 데이터
    public ApiDetailResponseDto getDetailData(String apiUrl) {
        try {
            URI uri = new URI(apiUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, ApiDetailResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //? 축제 이미지 데이터
    public ApiFestivalImageResponseDto getFestivalDescrtiptionData(String imageUrl) {
        try {
            URI uri = new URI(imageUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, ApiFestivalImageResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //? 축제 정보 데이터
    public ApiFestivalDescriptionResponseDto getFestivalImageData(String descriptionUrl) {
        try {
            URI uri = new URI(descriptionUrl);

            String jsonString = restTemplate.getForObject(uri, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, ApiFestivalDescriptionResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }
}
