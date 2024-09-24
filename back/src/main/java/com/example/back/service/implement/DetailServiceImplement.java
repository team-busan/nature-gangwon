package com.example.back.service.implement;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.Comparator;
import java.util.ArrayList;

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
import com.example.back.dto.request.detail.PatchDetailCommentRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentLikeRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.request.detail.PostDetailMarkRequestDto;
import com.example.back.dto.response.detail.PostDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailMarkResponseDto;
import com.example.back.dto.response.Festival.GetFestivalListResponseDto;
import com.example.back.dto.response.detail.DeleteDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailCommentListResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailMyMarkListResponseDto;
import com.example.back.dto.response.detail.GetDetailRandom3ListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.detail.PatchDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailCommentLikeResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailCommentListItemDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailImageDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailListItemDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailMarkListItemDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailRandom3ListItemDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.DetailCommentLikeEntity;
import com.example.back.entity.DetailDescriptionEntity;
import com.example.back.entity.DetailEntity;
import com.example.back.entity.DetailImageEntity;
import com.example.back.entity.DetailMarkEntity;
import com.example.back.entity.PlanMarkEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.DetailCommentLikeRepository;
import com.example.back.repository.DetailCommentRepository;
import com.example.back.repository.DetailDescriptionRepository;
import com.example.back.repository.DetailImageRepository;
import com.example.back.repository.DetailMarkRepository;
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

    private final DetailCommentLikeRepository detailCommentLikeRepository;

    private final DetailMarkRepository detailMarkRepository;

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
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(String detailSigungucode, String searchKeyword, String sortOrder,int page, int size) {
        try {
            List<DetailEntity> detailEntities;

            if ("all".equals(detailSigungucode)) {
                if (searchKeyword != null && !searchKeyword.isEmpty()) {
                    detailEntities = detailRepository.findByDetailTitleContainingIgnoreCase(searchKeyword);
                } else {
                    detailEntities = detailRepository.findAll();
                }
            } else if (detailSigungucode != null) {
                String mappedCode = mapSigungucode(detailSigungucode);
                if (searchKeyword != null && !searchKeyword.isEmpty()) {
                    detailEntities = detailRepository.findByDetailSigungucodeAndDetailTitleContainingIgnoreCase(mappedCode, searchKeyword);
                } else {
                    detailEntities = detailRepository.findByDetailSigungucode(mappedCode);
                }
            } else {
                detailEntities = new ArrayList<>();
            }
            
            List<GetDetailListItemDto> detailDto = GetDetailListItemDto.copyList(detailEntities, detailCommentRepository);

            Comparator<GetDetailListItemDto> comparator;
            switch (sortOrder) {
                case "댓글순":
                    comparator = Comparator.comparing(GetDetailListItemDto::getDetailTotalComment);
                    break;
                case "인기순":
                    comparator = Comparator.comparing(GetDetailListItemDto::getDetailViews);
                    break;
                case "전체":
                default:
                    comparator = Comparator.comparing(GetDetailListItemDto::getDetailId).reversed();
                    break;
            }
            detailDto.sort(comparator.reversed());

            int start = (page - 1) * size;
            int end = Math.min(start + size, detailDto.size());
            List<GetDetailListItemDto> pagedDetailDto;
            if(start>detailDto.size()){
                pagedDetailDto = Collections.emptyList();
            }else{
                pagedDetailDto = detailDto.subList(start, end);
            }
            GetDetailListResponseDto responseBody = new GetDetailListResponseDto(pagedDetailDto, detailDto.size(), (detailDto.size()+size-1)/size, page);
            
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

            List<DetailMarkEntity> detailMarkEntities = detailMarkRepository.findByDetailId(detailId);

            List<String> markedUserEmails = detailMarkEntities.stream()
                .map(DetailMarkEntity::getUserEmail)
                .collect(Collectors.toList());

            GetDetailResponseDto responseDto = new GetDetailResponseDto(detailEntity, detailImageDto, detailDescriptionEntity, markedUserEmails);
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

            List<DetailCommentEntity> commentList = detailCommentRepository.findByDetailIdOrderByDetailUploadDateDesc(detailId);

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

    //? 댓글 좋아요
    @Override
    public ResponseEntity<? super PostDetailCommentLikeResponseDto> postDetailCommentLike(String userEmail, PostDetailCommentLikeRequestDto dto) {
        int detailCommentId = dto.getDetailCommentId();
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PostDetailCommentResponseDto.existUser();
            }
            DetailEntity detailEntity = detailRepository.findByDetailId(dto.getDetailId());
            if(detailEntity == null){
                return PostDetailCommentLikeResponseDto.existDetail();
            }
            DetailCommentEntity detailCommentEntity = detailCommentRepository.findByDetailCommentId(detailCommentId);
            if(detailCommentEntity == null ) {
                return PostDetailCommentLikeResponseDto.DetailCommentLikeFail();
            }

            DetailCommentLikeEntity detailCommentLikeEntity = detailCommentLikeRepository.findByUserEmailAndDetailCommentId(userEmail, detailCommentId);
            if(detailCommentLikeEntity == null ){
                detailCommentLikeEntity = new DetailCommentLikeEntity(userEntity, detailCommentId);
                detailCommentLikeRepository.save(detailCommentLikeEntity);
            }else{
                detailCommentLikeRepository.delete(detailCommentLikeEntity);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            ResponseDto.databaseError();
        }
        return PostDetailCommentLikeResponseDto.success();
    }

    //? 댓글 삭제
    @Override
    public ResponseEntity<? super DeleteDetailCommentResponseDto> deleteDetailComment(String userEmail, int detailCommentId){
        try{
            DetailCommentEntity detailCommentEntity = detailCommentRepository.findByDetailCommentId(detailCommentId);
            if(detailCommentEntity == null){
                return DeleteDetailCommentResponseDto.existComment();
            }

            boolean isEqualWriter = userEmail.equals(detailCommentEntity.getUserEmail());
            if(!isEqualWriter) {
                return DeleteDetailCommentResponseDto.existUser();
            }

            detailCommentLikeRepository.deleteByDetailCommentId(detailCommentId);
            detailCommentRepository.deleteByDetailCommentId(detailCommentId);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteDetailCommentResponseDto.success();
    }

    //? 메인페이지 관광지 랜덤3개 리스트
    @Override
    public ResponseEntity<? super GetDetailRandom3ListResponseDto> getRandom3List() {
        try {
            List<DetailEntity> allDetails = detailRepository.findAll();

            Collections.shuffle(allDetails); 
            List<DetailEntity> randomDetails = allDetails.stream().limit(3).collect(Collectors.toList());

            List<GetDetailRandom3ListItemDto> detailDtos = randomDetails.stream().map(detail -> {
                DetailImageEntity image = detailImageRepository.findByDetailId(detail.getDetailId());

                GetDetailImageDto detailImageDto = new GetDetailImageDto(
                    detail.getDetailId(),
                    detail.getDetailContentid(),
                    detail.getDetailFirstimage(),
                    detail.getDetailFirstimage2(),
                    image != null ? image.getDetailImage1() : null,
                    image != null ? image.getDetailImage2() : null,
                    image != null ? image.getDetailImage3() : null,
                    image != null ? image.getDetailImage4() : null,
                    image != null ? image.getDetailImage5() : null
                );

                return new GetDetailRandom3ListItemDto(
                    detail.getDetailId(),
                    detail.getDetailTitle(),
                    detailImageDto 
                );
            }).collect(Collectors.toList());

            return GetDetailRandom3ListResponseDto.success(detailDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 댓글 수정
    @Override
    public ResponseEntity<? super PatchDetailCommentResponseDto> patchDetailComment(String userEamil, PatchDetailCommentRequestDto dto){
        try{
            DetailEntity detailEntity = detailRepository.findByDetailId(dto.getDetailId());
            if(detailEntity == null){
                PatchDetailCommentResponseDto.existDetail();
            }

            DetailCommentEntity detailCommentEntity = detailCommentRepository.findByDetailCommentId(dto.getDetailCommentId());
            if(detailCommentEntity == null){
                return PatchDetailCommentResponseDto.patchFail();
            }

            boolean isEqualUserEmail = userEamil.equals(detailCommentEntity.getUserEmail());
            if(!isEqualUserEmail){
                return PatchDetailCommentResponseDto.existUser();
            }

            detailCommentEntity.patch(dto);
            detailCommentRepository.save(detailCommentEntity);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchDetailCommentResponseDto.success();
    }



    //? 관광지 즐겨찾기
    @Override
    public ResponseEntity< ? super PostDetailMarkResponseDto> postDetailMark(String userEmail, PostDetailMarkRequestDto dto){
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return PostDetailMarkResponseDto.notExistUser();
            }

            DetailEntity detailEntity = detailRepository.findByDetailId(dto.getDetailId());
            if(detailEntity == null){
                return PostDetailMarkResponseDto.notExistDetial();
            }

            DetailMarkEntity detailMarkEntity = detailMarkRepository.findByUserEmailAndDetailId(userEmail, dto.getDetailId());
            if(detailMarkEntity == null){
                detailMarkEntity = new DetailMarkEntity(userEntity, dto.getDetailId());
                detailMarkRepository.save(detailMarkEntity);
            }else{
                detailMarkRepository.delete(detailMarkEntity);
            }
        }catch(Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return PostDetailMarkResponseDto.success();
    }

    //? 관광지 즐겨찾기 리스트 가져오기
    @Override
    public ResponseEntity<? super GetDetailMyMarkListResponseDto> getDetailMarkList(String userEmail){
        try{
            List<DetailMarkEntity> detailMarkList = detailMarkRepository.findByUserEmail(userEmail);
            if(detailMarkList == null){
                return GetDetailMyMarkListResponseDto.notExistDetail();
            }
             UserEntity userEntity = userRepository.findByUserEmail(userEmail);
             if(userEntity == null){
                return GetDetailMyMarkListResponseDto.notExistUser();
             }

             List<GetDetailMarkListItemDto> markList = detailMarkList.stream()
             .map(mark -> {
                DetailEntity detail = detailRepository.findByDetailId(mark.getDetailId());
                DetailImageEntity image = detailImageRepository.findByDetailId(mark.getDetailId());
                if(detail == null) return null;
                return new GetDetailMarkListItemDto(
                    detail.getDetailId(),
                    detail.getDetailTitle(),
                    detail.getDetailFirstimage(),
                    image != null ? image.getDetailImage3() : null
                );
             })
             .collect(Collectors.toList());
             return GetDetailMyMarkListResponseDto.success(markList);
        } catch (Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }

    //? 관광지 댓글 리스트
    @Override
    public ResponseEntity<? super GetDetailCommentListResponseDto> getDetailCommentList(int detailId, String sortType){
        try{
            DetailEntity detailEntity = detailRepository.findByDetailId(detailId);
            if(detailEntity == null){
                return GetDetailCommentListResponseDto.notExistDetail();
            }
            
            List<DetailCommentEntity> comments =  detailCommentRepository.findByDetailIdOrderByDetailUploadDateDesc(detailId);
            if(comments.isEmpty()){
                return GetDetailCommentListResponseDto.notExistComment();
            }

            List<GetDetailCommentListItemDto> commentDtos = comments.stream().map(comment -> {
                int likeCount = (int) detailCommentLikeRepository.countLikesByDetailCommentId(comment.getDetailCommentId());
                List<String> likedUserEmails = detailCommentLikeRepository.findByDetailCommentId(comment.getDetailCommentId())
                .stream()
                .map(DetailCommentLikeEntity::getUserEmail)
                .collect(Collectors.toList());

                return new GetDetailCommentListItemDto(
                    comment.getDetailCommentId(),
                    comment.getUserEmail(),
                    comment.getDetailId(),
                    comment.getUserNickname(),
                    comment.getUserProfile(),
                    comment.getDetailContent(),
                    comment.getScore(),
                    comment.getDetailUploadDate(),
                    likeCount,
                    likedUserEmails
                );
            }).collect(Collectors.toList());
            
            if (sortType == null || sortType.isEmpty() || "인기순".equals(sortType)) {
                commentDtos.sort(Comparator.comparingInt(GetDetailCommentListItemDto::getLikeCount).reversed());
            }else if("최신순".equals(sortType)){
                commentDtos.sort(Comparator.comparing(GetDetailCommentListItemDto::getDetailUploadDate).reversed());
            }

            return GetDetailCommentListResponseDto.success(commentDtos);

        } catch (Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }
}