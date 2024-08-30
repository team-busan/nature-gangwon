package com.example.back.service.implement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalCommentListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalImageDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalListItemDto;
import com.example.back.entity.FestivalCommentEntity;
import com.example.back.entity.FestivalDescriptionEntity;
import com.example.back.entity.FestivalEntity;
import com.example.back.entity.FestivalImageEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.FestivalCommentRepository;
import com.example.back.repository.FestivalDescriptionRepository;
import com.example.back.repository.FestivalImageRepository;
import com.example.back.repository.FestivalRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.FestivalService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalServiceImplement implements FestivalService {
    
    private final FestivalRepository festivalRepository;
    private final FestivalDescriptionRepository festivalDescriptionRepository;
    private final FestivalImageRepository festivalImageRepository;
    private final FestivalCommentRepository festivalCommentRepository;
    private final UserRepository userRepository;
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

    //? 축제 상세
    @Override
    public ResponseEntity<? super GetFestivalResponseDto> getFestival(int festivalId){
        try {
            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(festivalId);
            if(festivalEntity == null){
                return GetFestivalResponseDto.getFestivalFail();
            }

            FestivalDescriptionEntity festivalDescriptionEntity = festivalDescriptionRepository.findByFestivalId(festivalId);
            if(festivalDescriptionEntity == null){
                return GetFestivalResponseDto.getFestivalFail();
            }

            FestivalImageEntity festivalImageEntity = festivalImageRepository.findByFestivalId(festivalId);
            GetFestivalImageDto festivalImageDto = null;
            if(festivalImageEntity != null){
                festivalImageDto = new GetFestivalImageDto(festivalEntity, festivalImageEntity);
            }
            List<FestivalCommentEntity> festivalCommentEntity = festivalCommentRepository.findByFestivalIdOrderByFestivalUploadDateDesc(festivalId);
            List<GetFestivalCommentListItemDto> festivalCommentList = new ArrayList<>();
            

            GetFestivalResponseDto responseDto = new GetFestivalResponseDto(festivalEntity, festivalDescriptionEntity, festivalImageDto, festivalCommentList);
            festivalEntity.increaseViewCount();
            festivalRepository.save(festivalEntity);
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //?댓글요청&반환
    @Override
    public ResponseEntity<? super PostFestivalCommentResponseDto> postFestivalComment (String userEmail, PostFestivalCommentRequestDto dto){
        int festivalId = dto.getFestivalId();
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return PostFestivalCommentResponseDto.ExistUser();
            }
            
            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(festivalId);
            if(festivalEntity == null){
                return PostFestivalCommentResponseDto.postFestivalCommentFail();
            }

            FestivalCommentEntity festivalCommentEntity = new FestivalCommentEntity(userEntity, dto);
            festivalCommentRepository.save(festivalCommentEntity);

            List<FestivalCommentEntity> commentList = festivalCommentRepository.findByFestivalIdOrderByFestivalUploadDateDesc(festivalId);

            BigDecimal totalScore = commentList.stream()
            .map(comment -> new BigDecimal(comment.getScore()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

            //? 평균 점수
            BigDecimal averageScore = BigDecimal.ZERO;
            if (!commentList.isEmpty()) {
                averageScore = totalScore.divide(new BigDecimal(commentList.size()), MathContext.DECIMAL64);
                averageScore = averageScore.setScale(1, RoundingMode.HALF_UP);
            }

            festivalEntity.setFestivalTotalScore(averageScore);
            festivalRepository.save(festivalEntity);

       } catch (Exception e){
            e.printStackTrace();
            return PostFestivalCommentResponseDto.databaseError();
       }
       return PostFestivalCommentResponseDto.success();
    }
}
