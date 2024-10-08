package com.example.back.service.implement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.festival.PatchFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentLikeRequestDto;
import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;
import com.example.back.dto.request.festival.PostFestivalMarkRequestDto;
import com.example.back.dto.response.Festival.DeleteFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.GetFestivalCommentListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalMarkListResponseDto;
import com.example.back.dto.response.Festival.GetFestivalResponseDto;
import com.example.back.dto.response.Festival.PatchFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentLikeResponseDto;
import com.example.back.dto.response.Festival.PostFestivalCommentResponseDto;
import com.example.back.dto.response.Festival.PostFestivalMarkResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalCommentListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalImageDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalItemDto;
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
import java.util.Comparator;
import java.util.Collections;
import java.util.Random;


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
    public ResponseEntity<? super GetFestivalListResponseDto> getFestivalList(int page, int size, String sortOrder){
        try {
            LocalDateTime currentDate = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedCurrentDate = currentDate.format(formatter);
    
            List<FestivalEntity> onGoingFestivals = festivalRepository
                .findByFestivalStartDateBeforeAndFestivalEndDateAfter(formattedCurrentDate, formattedCurrentDate);
    
            List<FestivalEntity> upComingFestivals = festivalRepository
                .findByFestivalStartDateAfter(formattedCurrentDate);
    
            List<GetFestivalListItemDto> onGoingFestivalList = GetFestivalListItemDto.copyList(onGoingFestivals, festivalCommentRepository);
            List<GetFestivalListItemDto> upComingFestivalList = GetFestivalListItemDto.copyList(upComingFestivals, festivalCommentRepository);
    
            Random random = new Random();
            GetFestivalListItemDto randomFestival = null;

            if (!onGoingFestivalList.isEmpty()) {
                int randomIndex = random.nextInt(onGoingFestivalList.size());  
                randomFestival = onGoingFestivalList.get(randomIndex);         
            }

            String randomFestivalImage = null;
            if (randomFestival != null) {
                randomFestivalImage = randomFestival.getFestivalFirstimage();
                if (randomFestivalImage == null || randomFestivalImage.isEmpty()) {
                    randomFestivalImage = "/image/festival.jpg";  
                }
            }

            Comparator<GetFestivalListItemDto> comparator;
            switch (sortOrder) {
                case "댓글순":
                    comparator = Comparator.comparing(GetFestivalListItemDto::getFestivalTotalComment);
                    break;
                case "인기순":
                    comparator = Comparator.comparing(GetFestivalListItemDto::getFestivalViews);
                    break;
                case "전체":
                default:
                    comparator = Comparator.comparing(GetFestivalListItemDto::getFestivalStartDate);
                    break;
            }
    
            onGoingFestivalList.sort(comparator.reversed());
            upComingFestivalList.sort(comparator.reversed());

            int start = (page - 1) * size;
            int end = Math.min(start + size, upComingFestivalList.size());
            List<GetFestivalListItemDto> pagedUpComingList;
            if(start>upComingFestivalList.size()){
                pagedUpComingList = Collections.emptyList();
            }else{
                pagedUpComingList = upComingFestivalList.subList(start, end);
            }

            GetFestivalListResponseDto responseBody = new GetFestivalListResponseDto(
                onGoingFestivalList,
                pagedUpComingList,
                upComingFestivalList.size(),
                (upComingFestivalList.size()+size-1)/size,
                page,
                randomFestivalImage
            );
            
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }catch(Exception exception) {
            exception.printStackTrace();
            return GetFestivalListResponseDto.getFestivalListFail();
        }
    }

    //? 축제 상세
    @Override
    public ResponseEntity<? super GetFestivalResponseDto> getFestival(String festivalContentid) {
        try {
            FestivalEntity festivalEntity = festivalRepository.findByFestivalContentid(festivalContentid);
            GetFestivalItemDto festivalItemDto = null;
            if (festivalEntity != null) {
                festivalItemDto = new GetFestivalItemDto(festivalEntity,festivalCommentRepository);
            }

            FestivalDescriptionEntity festivalDescriptionEntity = festivalDescriptionRepository.findByFestivalId(festivalEntity.getFestivalId());
            if (festivalDescriptionEntity == null) {
                return GetFestivalResponseDto.getFestivalFail();
            }

            FestivalImageEntity festivalImageEntity = festivalImageRepository.findByFestivalId(festivalEntity.getFestivalId());
            GetFestivalImageDto festivalImageDto = null;
            if (festivalImageEntity != null) {
                festivalImageDto = new GetFestivalImageDto(festivalEntity, festivalImageEntity);
            }

            List<FestivalMarkEntity> festivalMarkEntities = festivalMarkRepository.findByFestivalId(festivalEntity.getFestivalId());
            List<String> markedUserEmails = festivalMarkEntities.stream()
                .map(FestivalMarkEntity::getUserEmail)
                .collect(Collectors.toList());
            
            GetFestivalResponseDto responseDto = new GetFestivalResponseDto(festivalItemDto, festivalDescriptionEntity, festivalImageDto, markedUserEmails);
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

    //? 축제 댓글 리스트
    @Override
    public ResponseEntity<? super GetFestivalCommentListResponseDto> getFestivalCommentList(String festivalContentid, String sortType){
        try{
            FestivalEntity festivalEntity = festivalRepository.findByFestivalContentid(festivalContentid);
            if(festivalEntity == null){
                return GetFestivalCommentListResponseDto.notExistFestival();
            }

            List<FestivalCommentEntity> comments = festivalCommentRepository.findByFestivalIdOrderByFestivalUploadDateDesc(festivalEntity.getFestivalId());
            if(comments.isEmpty()){
                return GetFestivalCommentListResponseDto.notExistComment();
            }

            List<GetFestivalCommentListItemDto> commentDtos = comments.stream().map(comment -> {
                int likeCount = (int) festivalCommentLikeRepository.countLikesByFestivalCommentId(comment.getFestivalCommentId());

                List<String> likedUserEmails = festivalCommentLikeRepository.findByFestivalCommentId(comment.getFestivalCommentId())
                .stream()
                .map(FestivalCommentLIkeEntity::getUserEmail)
                .collect(Collectors.toList());

                return new  GetFestivalCommentListItemDto(
                    comment.getFestivalCommentId(),
                    comment.getUserEmail(),
                    comment.getFestivalId(),
                    comment.getUserNickname(),
                    comment.getUserProfile(),
                    comment.getFestivalContent(),
                    comment.getScore(),
                    comment.getFestivalUploadDate().toString(),
                    likeCount,
                    likedUserEmails
                );
            }).collect(Collectors.toList());

            if (sortType == null || sortType.isEmpty() || "인기순".equals(sortType)) {
                commentDtos.sort(Comparator.comparingInt(GetFestivalCommentListItemDto::getLikeCount).reversed());          
            }else if("최신순".equals(sortType)){
                commentDtos.sort(Comparator.comparing(GetFestivalCommentListItemDto::getFestivalUploadDate).reversed());
            }
            
            return GetFestivalCommentListResponseDto.success(commentDtos);
        } catch (Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }
}
