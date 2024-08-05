package com.example.back.service.implement;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.response.location.GetLocationBasedListResponseDto;
import com.example.back.dto.response.location.locationfiled.GetLocationBasedListItemDto;
import com.example.back.entity.LocationBasedEntity;
import com.example.back.repository.LocationBasedRepository;
import com.example.back.service.LocationBasedService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationBasedServiceImplement implements LocationBasedService {

    private final LocationBasedRepository locationBasedRepository;

    private String mapSigungucode(String sigunguName) {
        Map sigunguMap = new HashMap<>();
        sigunguMap.put("강릉시", "1");
        sigunguMap.put("고성군", "2");
        sigunguMap.put("동해시", "3");
        sigunguMap.put("삼척시", "4");
        sigunguMap.put("속초시", "5");
        sigunguMap.put("양구군", "6");
        sigunguMap.put("양양군", "7");
        sigunguMap.put("영월군", "8");
        sigunguMap.put("원주시", "9");
        sigunguMap.put("인제군", "10");
        sigunguMap.put("정선군", "11");
        sigunguMap.put("철원군", "12");
        sigunguMap.put("춘천시", "13");
        sigunguMap.put("태백시", "14");
        sigunguMap.put("평창군", "15");
        sigunguMap.put("홍천군", "16");
        sigunguMap.put("화천군", "17");
        sigunguMap.put("횡성군", "18");

        return (String) sigunguMap.getOrDefault(sigunguName, sigunguName); 
    }

    private String mapContenttypeName(String contentTypeName) {
        Map contentTypeMap = new HashMap<>();
        contentTypeMap.put("관광지", "12");
        contentTypeMap.put("축제", "15");
        contentTypeMap.put("숙박", "32");
        contentTypeMap.put("음식점", "39");

        return (String) contentTypeMap.getOrDefault(contentTypeName, contentTypeName);
    }

    //? 관광지, 축제, 숙박, 음식점 전체 리스트 
    //? 파라미터 lpcationContentid 각 타입별 리스트 12, 25, 32, 39
    //? 파라미터 lpcationSigungucode 지역별 리스트 sigungucode 1~18번 1 강릉시, 2 고성군, 3 동해시, 4 삼척시, 5 속초시, 6 양구군, 7 양양군, 8 영월군, 9 원주시, 
    //? 10 인제군, 11 정선군, 12 철원군, 13 춘천시, 14 태백시, 15 평창군, 16 홍천군, 17 화천군, 18 횡성군
    @Override
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationList(String locationContenttypeid, String locationSigungucode, int page, int size) {
        try {
            int zeroBasedPage = page - 1;
            Pageable pageable = PageRequest.of(zeroBasedPage, size);
            Page<LocationBasedEntity> locationList;
            
            String mappedType = (locationContenttypeid != null && !locationContenttypeid.isEmpty()) ? mapContenttypeName(locationContenttypeid) : null;
            String mappedCode = (locationSigungucode != null && !locationSigungucode.isEmpty()) ? mapSigungucode(locationSigungucode) : null;

            if (mappedType == null && mappedCode == null) {
                locationList = locationBasedRepository.findAll(pageable);
            } else if (mappedType != null && mappedCode != null) {
                locationList = locationBasedRepository.findByLocationContenttypeidAndLocationSigungucode(mappedType, mappedCode, pageable);
            } else if (mappedType != null) {
                locationList = locationBasedRepository.findByLocationContenttypeid(mappedType, pageable);
            } else {
                locationList = locationBasedRepository.findByLocationSigungucode(mappedCode, pageable);
            }

            List<GetLocationBasedListItemDto> responseList = GetLocationBasedListItemDto.copyList(locationList.getContent());
            GetLocationBasedListResponseDto responseBody = new GetLocationBasedListResponseDto(responseList, locationList.getTotalElements(), locationList.getTotalPages(), page);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
           e.printStackTrace();
           return GetLocationBasedListResponseDto.getLocationListFail();
        }
    }
    
}
