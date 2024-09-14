package com.example.back.service.implement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.festival.PatchFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentLikeRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalMarkRequestDto;
import com.example.back.dto.response.Festival.DeleteFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalMarkListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PatchFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentLikeResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalMarkResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalCommentListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalImageDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalMarkListItemDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.entity.FestivalCommentEntity;
import com.example.back.entity.FestivalCommentLIkeEntity;
import com.example.back.entity.FestivalDescriptionEntity;
import com.example.back.entity.FestivalEntity;
import com.example.back.entity.FestivalImageEntity;
import com.example.back.entity.FestivalMarkEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.FestivalCommentLikeRepository;
import com.example.back.repository.FestivalCommentRepository;
import com.example.back.repository.FestivalDescriptionRepository;
import com.example.back.repository.FestivalImageRepository;
import com.example.back.repository.FestivalMarkRepository;
import com.example.back.repository.FestivalRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.FestivalService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
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
    private final FestivalCommentLikeRepository festivalCommentLikeRepository;
    private final FestivalMarkRepository festivalMarkRepository;
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
    public ResponseEntity<? super GetFestivalResponseDto> getFestival(int festivalId, String sortOrder) {
        try {
            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(festivalId);
            if (festivalEntity == null) {
                return GetFestivalResponseDto.getFestivalFail();
            }

            FestivalDescriptionEntity festivalDescriptionEntity = festivalDescriptionRepository.findByFestivalId(festivalId);
            if (festivalDescriptionEntity == null) {
                return GetFestivalResponseDto.getFestivalFail();
            }

            FestivalImageEntity festivalImageEntity = festivalImageRepository.findByFestivalId(festivalId);
            GetFestivalImageDto festivalImageDto = null;
            if (festivalImageEntity != null) {
                festivalImageDto = new GetFestivalImageDto(festivalEntity, festivalImageEntity);
            }

            List<FestivalCommentEntity> festivalCommentEntities;
            if ("likes".equals(sortOrder)) {
                festivalCommentEntities = festivalCommentRepository.findByFestivalIdOrderByLikeCountDesc(festivalId);
            } else {
                festivalCommentEntities = festivalCommentRepository.findByFestivalIdOrderByFestivalUploadDateDesc(festivalId);
            }

            List<GetFestivalCommentListItemDto> festivalCommentList = new ArrayList<>();
            for (FestivalCommentEntity comment : festivalCommentEntities) {
                int likeCount = comment.getLikeCount();
                GetFestivalCommentListItemDto festivalCommentDto = new GetFestivalCommentListItemDto();
                festivalCommentDto.setFestivalCommentId(comment.getFestivalCommentId());
                festivalCommentDto.setFestivalId(comment.getFestivalId());
                festivalCommentDto.setUserEmail(comment.getUserEmail());
                festivalCommentDto.setUserNickname(comment.getUserNickname());
                festivalCommentDto.setUserProfile(comment.getUserProfile());
                festivalCommentDto.setFestivalContent(comment.getFestivalContent());
                festivalCommentDto.setScore(comment.getScore());
                festivalCommentDto.setFestivalUploadDate(comment.getFestivalUploadDate());
                festivalCommentDto.setLikeCount(likeCount);

                festivalCommentList.add(festivalCommentDto);
            }

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
    //? 댓글 좋아요
    @Override
    public ResponseEntity<? super PostFestivalCommentLikeResponseDto> postFestivalCommentLike(String userEmail, PostFestivalCommentLikeRequestDto dto){
        int festivalCommentId = dto.getFestivalCommentId();
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PostPlanCommentResponseDto.notExistUser();
            }

            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(dto.getFestivalId());
            if(festivalEntity == null){
                return PostFestivalCommentLikeResponseDto.notExistFestival();
            }

            FestivalCommentEntity festivalCommentEntity = festivalCommentRepository.findByFestivalCommentId(festivalCommentId);
            if(festivalCommentEntity == null) {
                return PostFestivalCommentLikeResponseDto.festivalCommentLikeFail();
            }

            FestivalCommentLIkeEntity festivalCommentLIkeEntity = festivalCommentLikeRepository.findByUserEmailAndFestivalCommentId(userEmail, festivalCommentId);
            if(festivalCommentLIkeEntity == null) {
                festivalCommentLIkeEntity = new FestivalCommentLIkeEntity(userEntity, festivalCommentId);
                festivalCommentLikeRepository.save(festivalCommentLIkeEntity);
            } else {
                festivalCommentLikeRepository.delete(festivalCommentLIkeEntity);
            }

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return PostFestivalCommentLikeResponseDto.success();
    }

    //? 댓글 삭제
    @Override
    public ResponseEntity<? super DeleteFestivalCommentResponseDto> deleteFestivalComment(String userEmail, int festivalCommentId){
        try {
            FestivalCommentEntity festivalCommentEntity = festivalCommentRepository.findByFestivalCommentId(festivalCommentId);
            if(festivalCommentEntity == null){
                return DeleteFestivalCommentResponseDto.deleteCommentFail();
            }

            boolean isEqualWriter = userEmail.equals(festivalCommentEntity.getUserEmail());
            if(!isEqualWriter) {
                return DeleteFestivalCommentResponseDto.existuser();
            }

            festivalCommentLikeRepository.deleteByFestivalCommentId(festivalCommentId);
            festivalCommentRepository.deleteByFestivalCommentId(festivalCommentId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteFestivalCommentResponseDto.success();
    }

    //? 댓글 수정
    @Override
    public ResponseEntity<? super PatchFestivalCommentResponseDto> patchFestivalComment(String userEamil, PatchFestivalCommentRequestDto dto){
        try{
            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(dto.getFestivalId());
            if(festivalEntity == null){
                PatchFestivalCommentResponseDto.existFestival();
            }
            
            FestivalCommentEntity festivalCommentEntity = festivalCommentRepository.findByFestivalCommentId(dto.getFestivalCommentId());
            if(festivalCommentEntity == null){
                return PatchFestivalCommentResponseDto.patchFail();
            }

            boolean isEqualUserEmail = userEamil.equals(festivalCommentEntity.getUserEmail());
            if(!isEqualUserEmail){
                return PatchFestivalCommentResponseDto.existUser();
            }

            festivalCommentEntity.patch(dto);
            festivalCommentRepository.save(festivalCommentEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchFestivalCommentResponseDto.success();
    }

    //? 축제 즐겨찾기
    @Override
    public ResponseEntity<? super PostFestivalMarkResponseDto> postFestivalMark(String userEmail, PostFestivalMarkRequestDto dto){
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return PostFestivalMarkResponseDto.notExistUser();
            }

            FestivalEntity festivalEntity = festivalRepository.findByFestivalId(dto.getFestivalId());
            if(festivalEntity == null){
                return PostFestivalMarkResponseDto.notExistFestival();
            }

            FestivalMarkEntity festivalMarkEntity = festivalMarkRepository.findByUserEmailAndFestivalId(userEmail, dto.getFestivalId());
            if (festivalMarkEntity == null) {
                festivalMarkEntity = new FestivalMarkEntity(userEntity, dto.getFestivalId());
                festivalMarkRepository.save(festivalMarkEntity);
            }else{
                festivalMarkRepository.delete(festivalMarkEntity);
            }
        
        } catch (Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return PostFestivalMarkResponseDto.success();
    }

    //? 축제 즐겨찾기 리스트 가져오기
    @Override
    public ResponseEntity<? super GetFestivalMarkListResponseDto> getFestivalMarkList(String userEmail){
        try{
            List<FestivalMarkEntity> festivalMarkList = festivalMarkRepository.findByUserEmail(userEmail);
            if(festivalMarkList == null){
                return GetFestivalMarkListResponseDto.notExistFestival();
            }

            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return GetFestivalMarkListResponseDto.notExistUser();
            }

            List<GetFestivalMarkListItemDto> markList = festivalMarkList.stream()
            .map(mark -> {
                FestivalEntity festival = festivalRepository.findByFestivalId(mark.getFestivalId());
                FestivalImageEntity image = festivalImageRepository.findByFestivalId(mark.getFestivalId());
                if(festival == null) return null;
                return new GetFestivalMarkListItemDto(
                    festival.getFestivalId(),
                    festival.getFestivalTitle(),
                    festival.getFestivalStartDate(),
                    festival.getFestivalEndDate(),
                    festival.getFestivalFirstimage(),
                    image != null ? image.getFestivalImage3() : null

                );
            })
            .collect(Collectors.toList());
            return GetFestivalMarkListResponseDto.success(markList);
        } catch (Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }
}
