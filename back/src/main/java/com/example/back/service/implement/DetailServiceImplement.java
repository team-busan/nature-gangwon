package com.example.back.service.implement;

import java.util.List;

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

    @Override
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<DetailEntity> detailPageList;
            if(detailSigungucode == null || detailSigungucode.isEmpty()) {
                detailPageList = detailRepository.findAll(pageable);
            } else {
                detailPageList = detailRepository.findByDetailSigungucode(detailSigungucode, pageable);
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
