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

    @Override
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationList() {
        try {
            List<LocationBasedEntity> locationList = locationBasedRepository.findAll();

            List<GetLocationBasedListItemDto> responseList = GetLocationBasedListItemDto.copyList(locationList);
            return ResponseEntity.status(HttpStatus.OK).body(responseList);
        } catch (Exception e) {
           e.printStackTrace();
           return GetLocationBasedListResponseDto.getLocationListFail();
        }
    }

    @Override
    public ResponseEntity<? super GetLocationBasedListResponseDto> getLocationAreaList(String locationContenttypeid) {
        try {
            List<LocationBasedEntity> locationAreaList = locationBasedRepository.findByLocationContenttypeid(locationContenttypeid);

            List<GetLocationBasedListItemDto> responseList = GetLocationBasedListItemDto.copyList(locationAreaList);
            return GetLocationBasedListResponseDto.success(responseList);
        } catch (Exception e) {
            e.printStackTrace();
            return GetLocationBasedListResponseDto.getLocationListFail();
        }
    }
    
}
