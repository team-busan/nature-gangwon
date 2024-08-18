package com.example.back.service.implement;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.response.detail.PostDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailImageDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailListItemDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.DetailDescriptionEntity;
import com.example.back.entity.DetailEntity;
import com.example.back.entity.DetailImageEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.DetailCommentRepository;
import com.example.back.repository.DetailDescriptionRepository;
import com.example.back.repository.DetailImageRepository;
import com.example.back.repository.DetailRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.DetailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DetailServiceImplement implements DetailService{

    private final DetailRepository detailRepository;

    private final DetailDescriptionRepository detailDescriptionRepository;

    private final DetailImageRepository detailImageRepository;

    private final DetailCommentRepository detailCommentRepository;

    private final UserRepository userRepository;

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

    //? 관광지 리스트
    @Override
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, int page, int size) {
        try {
            int zeroBasedPage = page - 1;
            Pageable pageable = PageRequest.of(zeroBasedPage, size);
            Page<DetailEntity> detailPageList;
            if ("all".equals(detailSigungucode)) {
                detailPageList = detailRepository.findAll(pageable);
            } else if (detailSigungucode != null) {
                String mappedCode = mapSigungucode(detailSigungucode);
                detailPageList = detailRepository.findByDetailSigungucode(mappedCode, pageable);
            } else {
                detailPageList = Page.empty(pageable);
            }
            
            List<GetDetailListItemDto> responseList = GetDetailListItemDto.copyList(detailPageList.getContent(), detailCommentRepository);
            GetDetailListResponseDto responseBody = new GetDetailListResponseDto(responseList, detailPageList.getTotalElements(), detailPageList.getTotalPages(), page);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return GetDetailListResponseDto.getDetailListFail();
        }
    }

    //? 관광지 상세
    @Override
    public ResponseEntity<? super GetDetailResponseDto> getDetail(int detailId) {
        try {
            DetailEntity detailEntity = detailRepository.findByDetailId(detailId);
            if (detailEntity == null) {
                return GetDetailResponseDto.getDetailFail();
            }

            DetailImageEntity detailImageEntity = detailImageRepository.findByDetailId(detailId);

            GetDetailImageDto detailImageDto = null;
            if (detailImageEntity != null) {
                detailImageDto = new GetDetailImageDto(detailEntity, detailImageEntity);
            }

            DetailDescriptionEntity detailDescriptionEntity = detailDescriptionRepository.findByDetailId(detailId);
            if (detailDescriptionEntity == null) {
                return GetDetailResponseDto.getDetailFail();
            }
            List<DetailCommentEntity> detailCommentList = detailCommentRepository.findByDetailId(detailId);


            GetDetailResponseDto responseDto = new GetDetailResponseDto(detailEntity, detailImageDto, detailDescriptionEntity, detailCommentList );
            detailEntity.increaseViewCount();
            detailRepository.save(detailEntity);
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 댓글요청&반환
    @Override
    public ResponseEntity<? super PostDetailCommentResponseDto> postComment (String userEmail, PostDetailCommentRequsetDto dto){
        int detailId = dto.getDetailId();
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return PostDetailCommentResponseDto.existUser();
            }
            
            DetailEntity detailEntity = detailRepository.findByDetailId(detailId);
            if(detailEntity == null){
                return PostDetailCommentResponseDto.postCommentFail();
            }

            DetailCommentEntity detailCommentEntity = new DetailCommentEntity(userEntity, dto);
            detailCommentRepository.save(detailCommentEntity);

            List<DetailCommentEntity> commentList = detailCommentRepository.findByDetailId(detailId);

            BigDecimal totalScore = commentList.stream()
            .map(comment -> new BigDecimal(comment.getScore()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

            //? 평균 점수
            BigDecimal averageScore = BigDecimal.ZERO;
            if (!commentList.isEmpty()) {
                averageScore = totalScore.divide(new BigDecimal(commentList.size()), MathContext.DECIMAL64);
                averageScore = averageScore.setScale(1, RoundingMode.HALF_UP);
            }

            detailEntity.setDetailTotalScore(averageScore);
            detailRepository.save(detailEntity);

       } catch (Exception e){
            e.printStackTrace();
            return PostDetailCommentResponseDto.databaseError();
       }
       return PostDetailCommentResponseDto.success();
    } 

}
