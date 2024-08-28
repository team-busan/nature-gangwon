package com.example.back.service.implement;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.common.ResponseCode;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.plan.PatchPlanCommentRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto.PatchPlanPlaceRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentLikeRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentRequestDto;
import com.example.back.dto.request.plan.PostPlanMarkRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto.PostPlanPlaceRequestDto;
import com.example.back.dto.response.plan.DeletePlanCommentResponseDto;
import com.example.back.dto.response.plan.DeletePlanResponseDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.GetPlanTop3ListResponseDto;
import com.example.back.dto.response.plan.GetPlanListResponseDto;
import com.example.back.dto.response.plan.PatchPlanCommentResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentLikeResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.dto.response.plan.PostPlanMarkResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlaceListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanCommentListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanListItemDto;
import com.example.back.entity.LocationBasedEntity;
import com.example.back.entity.PhotosEntity;
import com.example.back.entity.PlacesEntity;
import com.example.back.entity.PlanCommentEntity;
import com.example.back.entity.PlanCommentLikeEntity;
import com.example.back.entity.PlanEntity;
import com.example.back.entity.PlanMarkEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.LocationBasedRepository;
import com.example.back.repository.PhotosRepository;
import com.example.back.repository.PlacesRepository;
import com.example.back.repository.PlanCommentLikeRepository;
import com.example.back.repository.PlanCommentRespository;
import com.example.back.repository.PlanMarkRepository;
import com.example.back.repository.PlanRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.PlanService;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Comparator;

import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanServiceImplement implements PlanService{
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final PlacesRepository placesRepository;
    private final LocationBasedRepository locationBasedRepository;
    private final PhotosRepository photosRepository;
    private final PlanCommentRespository planCommentRespository;
    private final PlanCommentLikeRepository planCommentLikeRepository;
    private final PlanMarkRepository planMarkRepository;

    //? 계획 작성하기 
    @Override
    public ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto) {
        try{
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PostPlanResponseDto.notExistUser();

            PlanEntity planEntity = new PlanEntity(userEntity, dto);
            planRepository.save(planEntity);
            
            List<PostPlanPlaceRequestDto> postPlanList = dto.getPostPlanList();
                for (PostPlanPlaceRequestDto placeRequestDto  : postPlanList) {
                    LocationBasedEntity locationBasedEntity = locationBasedRepository.findById(placeRequestDto.getLocationBasedId()).orElse(null);
                    if (locationBasedEntity == null) {
                        return PostPlanResponseDto.invalidBasedId(); 
                    }

                    PlacesEntity placesEntity = new PlacesEntity();
                    placesEntity.setPlanId(planEntity.getPlanId());
                    placesEntity.setLocationBasedId(placeRequestDto.getLocationBasedId());
                    placesEntity.setDayNumber(placeRequestDto.getDayNumber());
                    placesEntity.setNote(placeRequestDto.getNote());
                    placesEntity.setNote2(placeRequestDto.getNote2());

                    placesEntity.setPlaceAdd1(locationBasedEntity.getLocationAddr1());
                    placesEntity.setTitle(locationBasedEntity.getLocationTitle());
                    placesRepository.save(placesEntity);

                    List<String> photoUrls = placeRequestDto.getPhotoUrls();
                    if (photoUrls != null && !photoUrls.isEmpty()) {
                        for (String photoUrl : photoUrls) {
                            PhotosEntity photosEntity = new PhotosEntity();
                            photosEntity.setPlacesId(placesEntity.getPlacesId());
                            photosEntity.setPhotoUrl(photoUrl);
                            photosRepository.save(photosEntity);
                        }
                    }
                }
        }catch (Exception e) {
            e.printStackTrace();
            return PostPlanResponseDto.databaseError();
        }
        return PostPlanResponseDto.success();
    }

    //? 특정 계획 가져오기
    @Override
    public ResponseEntity<? super GetPlanResponseDto> getPlan(int planId) {
        try {
            PlanEntity planEntity = planRepository.findByPlanId(planId);
            if(planEntity == null){
                return GetPlanResponseDto.existPlan();
            } 

            int markCount = planMarkRepository.countByPlanId(planId);
            planEntity.setMarkCount(markCount);

            List<PlacesEntity> placesEntity = placesRepository.findByPlanId(planId);
            List<GetPlaceListItemDto> placeList = new ArrayList<>();

            for(PlacesEntity place : placesEntity) {
                LocationBasedEntity location = locationBasedRepository.findByLocationBasedId(place.getLocationBasedId());
                List<PhotosEntity> photos = photosRepository.findByPlacesId(place.getPlacesId());
                GetPlaceListItemDto placeDto = new GetPlaceListItemDto(
                    place.getPlacesId(),
                    place.getPlanId(),
                    place.getLocationBasedId(),
                    place.getDayNumber(),
                    place.getNote(),
                    place.getNote2(),
                    place.getPlaceAdd1(),
                    place.getTitle(),
                    location != null ? location.getLocationMapx() : null,
                    location != null ? location.getLocationMapy() : null,
                    photos.stream().map(PhotosEntity::getPhotoUrl).collect(Collectors.toList())
                );
                placeList.add(placeDto);
            }

            List<PlanCommentEntity> planCommentEntity = planCommentRespository.findByPlanIdOrderByPlanUploadDateDesc(planId);
            List<GetPlanCommentListItemDto> planCommentList = new ArrayList<>();

            for(PlanCommentEntity comment : planCommentEntity) {
                int likeCount = (int) planCommentLikeRepository.countLikesByPlanCommentId(comment.getPlanCommentId());
                GetPlanCommentListItemDto planCommentDto = new GetPlanCommentListItemDto();
                planCommentDto.setPlanCommentId(comment.getPlanCommentId());
                planCommentDto.setPlanId(comment.getPlanId());
                planCommentDto.setUserEmail(comment.getUserEmail());
                planCommentDto.setUserNickname(comment.getUserNickname());
                planCommentDto.setUserProfile(comment.getUserProfile());
                planCommentDto.setPlanContent(comment.getPlanContent());
                planCommentDto.setPlanUploadDate(comment.getPlanUploadDate());
                planCommentDto.setLikeCount((int) likeCount);

                planCommentList.add(planCommentDto);
            }


            planEntity.increasePlanCount();
            planRepository.save(planEntity);
            return GetPlanResponseDto.success(planEntity, placeList, planCommentList);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }

     //? 계획 수정
    @Override
    public ResponseEntity<? super PatchPlanResponseDto> patchPlan(String userEmail, PatchPlanRequestDto dto) {
        int planId = dto.getPlanId();
        try {
        PlanEntity planEntity = planRepository.findByPlanId(planId);
        if (planEntity == null) {
            return PatchPlanResponseDto.invalidId();
        }

        boolean isEqualUserEmail = userEmail.equals(planEntity.getUserEmail());
        if (!isEqualUserEmail) {
            return PatchPlanResponseDto.notPermissionUser();
        }

        planEntity.patch(dto);
        planRepository.save(planEntity);

        List<PatchPlanPlaceRequestDto> updatedPlaces = dto.getPatchPlanList();
        Set<Integer> updatedLocationBasedIds = new HashSet<>();
        
        for (PatchPlanPlaceRequestDto placeDto : updatedPlaces) {
            PlacesEntity placesEntity = placesRepository.findByPlanIdAndLocationBasedId(planId, placeDto.getLocationBasedId());
            if (placesEntity == null) {
                LocationBasedEntity locationBasedEntity = locationBasedRepository.findById(placeDto.getLocationBasedId()).orElse(null);
                if (locationBasedEntity == null) {
                    return PatchPlanResponseDto.invalidId();
                }
                placesEntity = new PlacesEntity();
                placesEntity.setPlanId(planId);
                placesEntity.setLocationBasedId(placeDto.getLocationBasedId());
                placesEntity.setDayNumber(placeDto.getDayNumber());
                placesEntity.setNote(placeDto.getNote());
                placesEntity.setNote2(placeDto.getNote2());
                placesEntity.setPlaceAdd1(locationBasedEntity.getLocationAddr1());
                placesEntity.setTitle(locationBasedEntity.getLocationTitle());
                placesRepository.save(placesEntity);
            } else {
                placesEntity.setDayNumber(placeDto.getDayNumber());
                placesEntity.setNote(placeDto.getNote());
                placesEntity.setNote2(placeDto.getNote2());

                LocationBasedEntity locationBasedEntity = locationBasedRepository.findById(placeDto.getLocationBasedId()).orElse(null);
                if (locationBasedEntity != null) {
                    placesEntity.setPlaceAdd1(locationBasedEntity.getLocationAddr1());
                    placesEntity.setTitle(locationBasedEntity.getLocationTitle());
                }
                placesRepository.save(placesEntity);
            }

            List<String> photoUrls = placeDto.getPhotoUrls();
            if (photoUrls != null) {
                photosRepository.deleteByPlacesId(placesEntity.getPlacesId());
                for (String photoUrl : photoUrls) {
                    PhotosEntity photosEntity = new PhotosEntity();
                    photosEntity.setPlacesId(placesEntity.getPlacesId());
                    photosEntity.setPhotoUrl(photoUrl);
                    photosRepository.save(photosEntity);
                }
            }

            updatedLocationBasedIds.add(placeDto.getLocationBasedId());
        }

        List<PlacesEntity> existingPlaces = placesRepository.findByPlanId(planId);
        for (PlacesEntity existingPlace : existingPlaces) {
            if (!updatedLocationBasedIds.contains(existingPlace.getLocationBasedId())) {
                photosRepository.deleteByPlacesId(existingPlace.getPlacesId());
                placesRepository.delete(existingPlace);
            }
        }
        }catch (Exception e) {
            e.printStackTrace();
            return PatchPlanResponseDto.databaseError();
        } 
        return PatchPlanResponseDto.success();
    }

    //? 계획에 댓글 남기기
	@Override
	public ResponseEntity<? super PostPlanCommentResponseDto> postPlanComment(String userEmail, PostPlanCommentRequestDto dto) {
		try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PostPlanCommentResponseDto.notExistUser();
            }

            PlanEntity planEntity = planRepository.findByPlanId(dto.getPlanId());
            if(planEntity == null) {
                return PostPlanCommentResponseDto.notExistPlan();
            }

            PlanCommentEntity planCommentEntity = new PlanCommentEntity(userEntity, dto);
            planCommentRespository.save(planCommentEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostPlanCommentResponseDto.success();
	}

    //? 계획 댓글 수정하기
    @Override
    public ResponseEntity<? super PatchPlanCommentResponseDto> patchPlanComment(String userEmail, PatchPlanCommentRequestDto dto) {
        try {
            PlanEntity planEntity = planRepository.findByPlanId(dto.getPlanId());
            if(planEntity == null) {
                PatchPlanCommentResponseDto.notExistPlan();
            }

            PlanCommentEntity planCommentEntity = planCommentRespository.findByPlanCommentId(dto.getPlanCommentId());
            if(planCommentEntity == null) {
                return PatchPlanCommentResponseDto.invalidId();
            }

            boolean isEqualUserEmail = userEmail.equals(planCommentEntity.getUserEmail());
            if (!isEqualUserEmail) {
                return PatchPlanCommentResponseDto.notPermissionUser();
            }

            planCommentEntity.patch(dto);
            planCommentRespository.save(planCommentEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchPlanCommentResponseDto.success();
    }

    //? 계획 댓글에 좋아요
    @Override
    public ResponseEntity<? super PostPlanCommentLikeResponseDto> postPlanCommentLike(String userEmail, PostPlanCommentLikeRequestDto dto) {
        int planCommentId = dto.getPlanCommentId();
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PostPlanCommentResponseDto.notExistUser();
            }

            PlanEntity planEntity = planRepository.findByPlanId(dto.getPlanId());
            if(planEntity == null) {
                return PostPlanCommentLikeResponseDto.notExistPlan();
            }

            PlanCommentEntity planCommentEntity = planCommentRespository.findByPlanCommentId(planCommentId);
            if(planCommentEntity == null) {
                return PostPlanCommentLikeResponseDto.invalidId();
            }
            
            PlanCommentLikeEntity planCommentLikeEntity = planCommentLikeRepository.findByUserEmailAndPlanCommentId(userEmail, planCommentId);
            if(planCommentLikeEntity == null) {
                planCommentLikeEntity = new PlanCommentLikeEntity(userEntity, planCommentId);
                planCommentLikeRepository.save(planCommentLikeEntity);
            } else {
                planCommentLikeRepository.delete(planCommentLikeEntity);
            }

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();    
        }
        return PostPlanCommentLikeResponseDto.success();
    }
    
    //? 계획 즐겨찾기
    @Override
    public ResponseEntity<? super PostPlanMarkResponseDto> postPlanMark(String userEmail, PostPlanMarkRequestDto dto) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return PostPlanMarkResponseDto.notPermissionUser();
            }

            PlanEntity planEntity = planRepository.findByPlanId(dto.getPlanId());
            if(planEntity == null) {
                return PostPlanMarkResponseDto.invalidId();
            }

            PlanMarkEntity planMarkEntity = planMarkRepository.findByUserEmailAndPlanId(userEmail, dto.getPlanId());
            if(planMarkEntity == null) {
                planMarkEntity = new PlanMarkEntity(userEntity, dto.getPlanId());
                planMarkRepository.save(planMarkEntity);
            } else {
                planMarkRepository.delete(planMarkEntity);
            }


        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return PostPlanMarkResponseDto.success();
    }

    //? 계획 댓글 개별 삭제
    @Override
    public ResponseEntity<? super DeletePlanCommentResponseDto> deletePlanComment(String userEmail, int planCommentId) {
        try {
            PlanCommentEntity planCommentEntity = planCommentRespository.findByPlanCommentId(planCommentId);
            if(planCommentEntity == null) {
                return DeletePlanCommentResponseDto.invalidId();
            }

            boolean isEqualWriter = userEmail.equals(planCommentEntity.getUserEmail());
            if(!isEqualWriter) {
                return DeletePlanCommentResponseDto.notPermissionUser();
            }

            planCommentLikeRepository.deleteByPlanCommentId(planCommentId);
            planCommentRespository.deleteByPlanCommentId(planCommentId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeletePlanCommentResponseDto.success();
    }

    //? 게획 완전 삭제
    @Override
    public ResponseEntity<? super DeletePlanResponseDto> deletePlan(String userEmail, int planId) {
        try {
            PlanEntity planEntity = planRepository.findByPlanId(planId);
            if(planEntity == null) {
                return DeletePlanResponseDto.invalidId();
            }

            boolean isEqualWriter = userEmail.equals(planEntity.getUserEmail());
            if(!isEqualWriter) {
                return DeletePlanResponseDto.notPermissionUser();
            }

            List<PlanCommentEntity> planCommentEntities = planCommentRespository.findByPlanIdOrderByPlanUploadDateDesc(planId);
            for (PlanCommentEntity planCommentEntity : planCommentEntities) {
                planCommentLikeRepository.deleteByPlanCommentId(planCommentEntity.getPlanCommentId());
                planCommentRespository.deleteByPlanCommentId(planCommentEntity.getPlanCommentId());
            }

            List<PlacesEntity> placesEntities = placesRepository.findByPlanId(planId);
            for (PlacesEntity placesEntity : placesEntities) {
                photosRepository.deleteByPlacesId(placesEntity.getPlacesId());
            }

            planMarkRepository.deleteByPlanId(planId);
            placesRepository.deleteByPlanId(planId);
            planRepository.deleteByPlanId(planId);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return DeletePlanResponseDto.success();
    }

    //? 계획 좋아요순 탑 4
    @Override
    public ResponseEntity<? super GetPlanListResponseDto> getPlanList() {
        try {
            List<PlanEntity> allPlans = planRepository.findAll(Sort.by(Sort.Order.desc("planUploadDate")));

            List<GetPlanListItemDto> planDtos = allPlans.stream()
                .map(plan -> {
                    int markCount = (int) planMarkRepository.countByPlanId(plan.getPlanId());

                    List<PlacesEntity> placesEntities = placesRepository.findByPlanId(plan.getPlanId());
                    List<String> photoUrls = placesEntities.stream()
                        .flatMap(place -> photosRepository.findByPlacesId(place.getPlacesId()).stream())
                        .map(PhotosEntity::getPhotoUrl)
                        .collect(Collectors.toList());

                    return new GetPlanListItemDto(
                        plan.getPlanId(),
                        plan.getPlanTitle(),
                        plan.getPlanCount(),
                        markCount,
                        photoUrls
                    );
                })
                .collect(Collectors.toList());

            
            List<GetPlanListItemDto> top4Plans = planDtos.stream()
                .sorted(Comparator.comparingInt(GetPlanListItemDto::getMarkCount).reversed())
                .limit(4)
                .collect(Collectors.toList());

            
            List<GetPlanListItemDto> allPlansSortedByDate = planDtos.stream()
                .sorted(Comparator.comparingInt(GetPlanListItemDto::getPlanId).reversed())
                .collect(Collectors.toList());

            return GetPlanListResponseDto.success(top4Plans, allPlansSortedByDate);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return null;
    }

    //? 계획 top3 리스트(조회순)
    @Override
    public ResponseEntity<? super GetPlanTop3ListResponseDto> getPlanTop3List() {
        try {
            List<PlanEntity> top3List = planRepository.findTop3ByOrderByPlanCountDesc();
            
            if (top3List.isEmpty()) {
                return GetPlanTop3ListResponseDto.existPlan();
            }
            
            List<GetPlanListItemDto> planDtos = new ArrayList<>();
    
            for (PlanEntity plan : top3List) {
                int markCount = (int) planMarkRepository.countByPlanId(plan.getPlanId());

                List<PlacesEntity> placesEntities = placesRepository.findByPlanId(plan.getPlanId());
                List<String> photoUrls = placesEntities.stream()
                    .flatMap(place -> photosRepository.findByPlacesId(place.getPlacesId()).stream())
                    .map(PhotosEntity::getPhotoUrl)
                    .collect(Collectors.toList());

                    GetPlanListItemDto planDto = new GetPlanListItemDto(
                    plan.getPlanId(),
                    plan.getPlanTitle(),
                    plan.getPlanCount(),
                    markCount,
                    photoUrls
                );
                
                planDtos.add(planDto);
            }

            return GetPlanTop3ListResponseDto.success(planDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }
    
}
