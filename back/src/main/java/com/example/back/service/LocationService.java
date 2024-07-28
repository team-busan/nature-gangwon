package com.example.back.service;

import com.example.back.dto.response.tourismApi.ApiDetailResponseDto;
import com.example.back.dto.response.tourismApi.ApiFestivalResponseDto;
import com.example.back.dto.response.tourismApi.LocationFestivalResponseDto;
import com.example.back.dto.response.tourismApi.LocationTourismResponseDto;
import com.example.back.entity.DetailEntity;
import com.example.back.entity.FestivalEntity;
import com.example.back.entity.LocationBasedEntity;
import com.example.back.repository.DetailRepository;
import com.example.back.repository.FestivalRepository;
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
    private final DetailRepository detailRepository;
    private final FestivalRepository festivalRepository;

    @Autowired
    public LocationService(RestTemplate restTemplate, TourismApiRepository tourismApiRepository, DetailRepository detailRepository, FestivalRepository festivalRepository) {
        this.restTemplate = restTemplate;
        this.tourismApiRepository = tourismApiRepository;
        this.detailRepository = detailRepository;
        this.festivalRepository = festivalRepository;
    }

    //? locationEntity에 담길 api 관광지, 숙박, 음식점 데이터 강원도 기준 관광지(12), 숙박(32), 음식점(39) 파라미터 값을 조절해 요청.
    @Transactional
    public LocationTourismResponseDto getLocationTourismData(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, int areaCode, int contentTypeId) {
        try {
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

    //^ 위의 메서드를 통해 받아 db에 저장
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

    //? locationEntity에 담길 api 축제 데이터
    @Transactional
    public LocationFestivalResponseDto getLocationFestivalData(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, String listYN, String eventStartDate, String eventEndDate, int areaCode) {
        try {
            String url = baseUrl + "serviceKey=" + URLEncoder.encode(serviceKey, StandardCharsets.UTF_8.toString()) +
                    "&pageNo=" + pageNo +
                    "&numOfRows=" + numOfRows +
                    "&MobileApp=" + mobileApp +
                    "&MobileOS=" + mobileOS +
                    "&arrange=" + arrange +
                    "&listYN=" + listYN + 
                    "&eventStartDate=" + eventStartDate +
                    "&eventEndDate=" + eventEndDate +
                    "&areaCode=" + areaCode +
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
            return objectMapper.readValue(response.getBody(), LocationFestivalResponseDto.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Status Code: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to fetch data from API", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //^ 위의 메서드를 통해 받아 db에 저장
    @Transactional
    public void fetchAndSaveLocationsFastival(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, String listYN, String eventStartDate, String eventEndDate, int areaCode) {
            LocationFestivalResponseDto responseDto = getLocationFestivalData(baseUrl, serviceKey, pageNo, numOfRows, mobileApp, mobileOS, arrange, listYN, eventStartDate, eventEndDate, areaCode);
            
            if (responseDto != null) {
                List<LocationFestivalResponseDto.Item> itmes = responseDto.getResponse().getBody().getItems().getItem();

                List<LocationBasedEntity> entities = itmes.stream()
                        .map(item -> new LocationBasedEntity(
                                0, 
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
    
    //? detailEntity에 담길 api 관광지 데이터
    @Transactional
    public ApiDetailResponseDto getDetailData(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, int areaCode, int contentTypeId) {
        try {
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
            return objectMapper.readValue(response.getBody(), ApiDetailResponseDto.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Status Code: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to fetch data from API", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //^ 위의 메서드를 통해 받아 db에 저장
    @Transactional
    public void fetchAndSaveDetail(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, int areaCode, int contentTypeId) {
        ApiDetailResponseDto responseDto = getDetailData(baseUrl, serviceKey, pageNo, numOfRows, mobileApp, mobileOS, arrange, areaCode, contentTypeId);

            if (responseDto != null) {
                List<ApiDetailResponseDto.Item> itmes = responseDto.getResponse().getBody().getItems().getItem();

                List<DetailEntity> entities = itmes.stream()
                        .map(item ->  new DetailEntity(
                                0, 
                                item.getDetailTitle(),
                                item.getDetailContentid(),
                                item.getDetailAddress(),
                                item.getDetailTel(),
                                item.getDetailMapx(),
                                item.getDetailMapy(),
                                item.getDetailFirstimage(),
                                item.getDetailFirstimage2(),
                                item.getDetailSigungucode()
                            ))
                        .toList();

                    detailRepository.saveAll(entities);
        } else {
            throw new RuntimeException("No data received from API");
        }
    }

    //? festivalEntity에 담길 api 축제 데이터
    @Transactional
    public ApiFestivalResponseDto getFestivalData(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, String listYN, String eventStartDate, String eventEndDate, int areaCode) {
        try {
            String url = baseUrl + "serviceKey=" + URLEncoder.encode(serviceKey, StandardCharsets.UTF_8.toString()) +
                    "&pageNo=" + pageNo +
                    "&numOfRows=" + numOfRows +
                    "&MobileApp=" + mobileApp +
                    "&MobileOS=" + mobileOS +
                    "&arrange=" + arrange +
                    "&listYN=" + listYN + 
                    "&eventStartDate=" + eventStartDate +
                    "&eventEndDate=" + eventEndDate +
                    "&areaCode=" + areaCode +
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
            return objectMapper.readValue(response.getBody(), ApiFestivalResponseDto.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("HTTP Status Code: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to fetch data from API", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch data from API", e);
        }
    }

    //^ 위의 메서드를 통해 받아 db에 저장
    @Transactional
    public void fetchAndSaveFestival(String baseUrl, String serviceKey, int pageNo, int numOfRows, String mobileApp, String mobileOS, String arrange, String listYN, String eventStartDate, String eventEndDate, int areaCode) {
        ApiFestivalResponseDto responseDto = getFestivalData(baseUrl, serviceKey, pageNo, numOfRows, mobileApp, mobileOS, arrange, listYN, eventStartDate, eventEndDate, areaCode);

            if (responseDto != null) {
                List<ApiFestivalResponseDto.Item> itmes = responseDto.getResponse().getBody().getItems().getItem();

                List<FestivalEntity> entities = itmes.stream()
                        .map(item -> new FestivalEntity(
                                0, 
                                item.getFestivalTitle(),
                                item.getFestivalContentid(),
                                item.getFestivalAddress(),
                                item.getFestivalTel(),
                                item.getFestivalStartDate(),
                                item.getFestivalEndDate(),
                                item.getFestivalMapx(),
                                item.getFestivalMapy(),
                                item.getFestivalFirstimage(),
                                item.getFestivalFirstimage2(),
                                item.getFestivalSigungucode()
                        ))
                        .toList();

                    festivalRepository.saveAll(entities);
        } else {
            throw new RuntimeException("No data received from API");
        }
    }
}
