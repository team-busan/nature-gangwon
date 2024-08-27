package com.example.back.service.implement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalListItemDto;
import com.example.back.entity.FestivalEntity;
import com.example.back.repository.FestivalRepository;
import com.example.back.service.FestivalService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalServiceImplement implements FestivalService {
    
    private final FestivalRepository festivalRepository;

    //? 축제 리스트
    @Override
    public ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(int page, int size){
        try {
            LocalDateTime currentDate = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
            String formattedCurrentDate = currentDate.format(formatter);
    
            // 현재 진행 중인 축제 조회
            List<FestivalEntity> onGoingFestivals = festivalRepository
                .findByFestivalStartDateBeforeAndFestivalEndDateAfter(formattedCurrentDate, formattedCurrentDate);
    
            // 다가오는 축제 조회
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<FestivalEntity> upComingFestivalsPage = festivalRepository
                .findByFestivalStartDateAfter(formattedCurrentDate, pageable);
    
            // DTO 변환
            List<GetFestivalListItemDto> onGoingFestivalList = GetFestivalListItemDto.copyList(onGoingFestivals);
            List<GetFestivalListItemDto> upComingFestivalList = GetFestivalListItemDto.copyList(upComingFestivalsPage.getContent());
    
            // 응답 객체 구성
            GetFestivalListResponseDto responseBody = new GetFestivalListResponseDto(
                onGoingFestivalList,
                upComingFestivalList,
                upComingFestivalsPage.getTotalElements(),
                upComingFestivalsPage.getTotalPages(),
                page
            );
    
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }catch(Exception exception) {
            exception.printStackTrace();
            return GetFestivalListResponseDto.getFestivalListFail();
        }
    }
}
