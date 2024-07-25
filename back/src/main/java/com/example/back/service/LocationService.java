package com.example.back.service;

import com.example.back.dto.response.tourismApi.LocationTourismResponseDto;
import com.example.back.entity.LocationBasedEntity;
import com.example.back.repository.TourismApiRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Service
public class LocationService {

    private final RestTemplate restTemplate;
    private final TourismApiRepository tourismApiRepository;

    @Autowired
    public LocationService(RestTemplate restTemplate, TourismApiRepository tourismApiRepository) {
        this.restTemplate = restTemplate;
        this.tourismApiRepository = tourismApiRepository;
    }

    @Transactional
    public LocationTourismResponseDto getLocationTourismData(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, int areaCode, int contentTypeId) {
        try {
            // URL을 직접 조립
            String url = baseUrl + "serviceKey=" + URLEncoder.encode(serviceKey, StandardCharsets.UTF_8.toString()) +
                    "&pageNo=" + pageNo +
                    "&numOfRows=" + numOfRows +
                    "&MobileApp=" + mobileApp +
                    "&MobileOS=" + mobileOS +
                    "&arrange=" + arrange +
                    "&areaCode=" + areaCode +
                    "&contentTypeId=" + contentTypeId +
                    "&_type=json";

            System.out.println("Constructed URL: " + url);

            URI uri = new URI(url);

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

            System.out.println("Response Status Code: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(response.getBody(), LocationTourismResponseDto.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Status Code: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to fetch data from API", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    @Transactional
    public void fetchAndSaveLocations(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, int areaCode, int contentTypeId) {
        LocationTourismResponseDto responseDto = getLocationTourismData(baseUrl, serviceKey, pageNo, numOfRows, mobileApp, mobileOS, arrange, areaCode, contentTypeId);
        if (responseDto != null) {
            List<LocationTourismResponseDto.Item> items = responseDto.getResponse().getBody().getItems().getItem();

            List<LocationBasedEntity> entities = items.stream()
                    .map(item -> new LocationBasedEntity(
                            0, // Primary key 처리, 실제로는 ID 생성 전략에 따라 변경
                            item.getLocationAddr1(),
                            item.getLocationContentid(),
                            item.getLocationContenttypeid(),
                            item.getLocationFirstimage(),
                            item.getLocationFirstimage2(),
                            item.getLocationMapx(),
                            item.getLocationMapy(),
                            item.getLocationSigungucode(),
                            item.getLocationTitle()
                    ))
                    .toList();

            tourismApiRepository.saveAll(entities);
        } else {
            throw new RuntimeException("No data received from API");
        }
    }
}
