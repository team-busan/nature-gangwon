package com.example.back.service.implement;

import java.util.List;

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

    //? 관광지, 축제, 숙박, 음식점 전체 리스트 
    //? 파라미터 lpcationContentid 각 타입별 리스트 12, 25, 32, 39
    //? 파라미터 lpcationSigungucode 지역별 리스트 sigungucode 1~18번 1 강릉시, 2 고성군, 3 동해시, 4 삼척시, 5 속초시, 6 양구군, 7 양양군, 8 영월군, 9 원주시, 
    //? 10 인제군, 11 정선군, 12 철원군, 13 춘천시, 14 태백시, 15 평창군, 16 홍천군, 17 화천군, 18 횡성군
    @Override
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationList(String locationContenttypeid, String locationSigungucode) {
        try {
            List<LocationBasedEntity> locationList;

            if ((locationContenttypeid == null || locationContenttypeid.isEmpty()) && 
                (locationSigungucode == null || locationSigungucode.isEmpty())) {
                locationList = locationBasedRepository.findAll();
            } else if (locationContenttypeid != null && !locationContenttypeid.isEmpty() && 
            locationSigungucode != null && !locationSigungucode.isEmpty()) {
                locationList = locationBasedRepository.findByLocationContenttypeidAndLocationSigungucode(locationContenttypeid, locationSigungucode);
            } else if (locationContenttypeid != null && !locationContenttypeid.isEmpty()) {
                locationList = locationBasedRepository.findByLocationContenttypeid(locationContenttypeid);
            } else {
                locationList = locationBasedRepository.findByLocationSigungucode(locationSigungucode);
            }
            List<GetLocationBasedListItemDto> responseList = GetLocationBasedListItemDto.copyList(locationList);
            return ResponseEntity.status(HttpStatus.OK).body(responseList);
        } catch (Exception e) {
           e.printStackTrace();
           return GetLocationBasedListResponseDto.getLocationListFail();
        }
    }

    
    

    
    
}
