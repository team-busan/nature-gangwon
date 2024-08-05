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

import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailListItemDto;
import com.example.back.entity.DetailEntity;
import com.example.back.repository.DetailRepository;
import com.example.back.service.DetailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DetailServiceImplement implements DetailService{

    private final DetailRepository detailRepository;

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

        return (String) sigunguMap.getOrDefault(sigunguName, sigunguName); // 기본적으로 입력값 반환
    }

    @Override
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size) {
        try {
            int zeroBasedPage = page - 1;
            Pageable pageable = PageRequest.of(zeroBasedPage, size);
            Page<DetailEntity> detailPageList;
            if(detailSigungucode == null || detailSigungucode.isEmpty()) {
                detailPageList = detailRepository.findAll(pageable);
            } else {
                String mappedCode = mapSigungucode(detailSigungucode);
                detailPageList = detailRepository.findByDetailSigungucode(mappedCode, pageable);
            }
            
            List<GetDetailListItemDto> responseList = GetDetailListItemDto.copyList(detailPageList.getContent());
            GetDetailListResponseDto responseBody = new GetDetailListResponseDto(responseList, detailPageList.getTotalElements(), detailPageList.getTotalPages(), page);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return GetDetailListResponseDto.getDetailListFail();
        }
    }

}
