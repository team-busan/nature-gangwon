package com.example.back.service.implement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
import com.example.back.dto.response.plan.GetPlanCommentListResponseDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.GetPlanTop3ListResponseDto;
import com.example.back.dto.response.plan.GetPlanListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyMarkListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyNoteListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyPhotoListResponseDto;
import com.example.back.dto.response.plan.PatchPlanCommentResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentLikeResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.dto.response.plan.PostPlanMarkResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlaceListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanCommentListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyListAndMarkItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyNoteListItemDto;
import com.example.back.dto.response.plan.planfiled.GetPlanMyPhotoListItemDto;
import com.example.back.dto.response.plan.planfiled.GetTop3ListItemDto;
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
import com.example.back.repository.PlanCommentRepository;
import com.example.back.repository.PlanMarkRepository;
import com.example.back.repository.PlanRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.PlanService;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Comparator;
import java.util.Collections;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    private final PlanCommentRepository planCommentRepository;
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
            
            UserEntity userEntity = userRepository.findByUserEmail(planEntity.getUserEmail());
            if (userEntity == null) {
                return GetPlanResponseDto.existUser();
            }

            String userNickname = userEntity.getUserNickname();
            String userProfile = userEntity.getUserProfile();
            int markCount = planMarkRepository.countByPlanId(planId);
            planEntity.setUserNickname(userNickname);
            planEntity.setUserProfile(userProfile);
            planEntity.setMarkCount(markCount);

            int commentCount = planCommentRepository.countByPlanId(planId);
            planEntity.setCommentCount(commentCount);

            List<PlanMarkEntity> planMarkEntities = planMarkRepository.findByPlanId(planId);
            List<String> markedUserEmails = planMarkEntities.stream()
                .map(PlanMarkEntity::getUserEmail)
                .collect(Collectors.toList());

            List<PlacesEntity> placesEntity = placesRepository.findByPlanId(planId);
            List<GetPlaceListItemDto> placeList = new ArrayList<>();

            for(PlacesEntity place : placesEntity) {
                LocationBasedEntity location = locationBasedRepository.findByLocationBasedId(place.getLocationBasedId());
                List<PhotosEntity> photos = photosRepository.findByPlacesId(place.getPlacesId());
                GetPlaceListItemDto placeDto = new GetPlaceListItemDto(
                    place.getPlacesId(),
                    place.getPlanId(),
                    place.getLocationBasedId(),
                    location.getLocationContenttypeid(),
                    place.getDayNumber(),
                    place.getNote(),
                    place.getNote2(),
                    place.getPlaceAdd1(),
                    place.getTitle(),
                    location != null ? location.getLocationFirstimage() : null,
                    location != null ? location.getLocationMapx() : null,
                    location != null ? location.getLocationMapy() : null,
                    photos.stream().map(PhotosEntity::getPhotoUrl).collect(Collectors.toList())
                );
                placeList.add(placeDto);
            }

            placeList.sort(Comparator.comparing(GetPlaceListItemDto::getDayNumber));

            planEntity.increasePlanCount();
            planRepository.save(planEntity);
            return GetPlanResponseDto.success(planEntity, placeList, markedUserEmails);
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
            planCommentRepository.save(planCommentEntity);
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

            PlanCommentEntity planCommentEntity = planCommentRepository.findByPlanCommentId(dto.getPlanCommentId());
            if(planCommentEntity == null) {
                return PatchPlanCommentResponseDto.invalidId();
            }

            boolean isEqualUserEmail = userEmail.equals(planCommentEntity.getUserEmail());
            if (!isEqualUserEmail) {
                return PatchPlanCommentResponseDto.notPermissionUser();
            }

            planCommentEntity.patch(dto);
            planCommentRepository.save(planCommentEntity);

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

            PlanCommentEntity planCommentEntity = planCommentRepository.findByPlanCommentId(planCommentId);
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
            return ResponseDto.databaseError();
        }
        return PostPlanMarkResponseDto.success();
    }

    //? 계획 댓글 개별 삭제
    @Override
    public ResponseEntity<? super DeletePlanCommentResponseDto> deletePlanComment(String userEmail, int planCommentId) {
        try {
            PlanCommentEntity planCommentEntity = planCommentRepository.findByPlanCommentId(planCommentId);
            if(planCommentEntity == null) {
                return DeletePlanCommentResponseDto.invalidId();
            }

            boolean isEqualWriter = userEmail.equals(planCommentEntity.getUserEmail());
            if(!isEqualWriter) {
                return DeletePlanCommentResponseDto.notPermissionUser();
            }

            planCommentLikeRepository.deleteByPlanCommentId(planCommentId);
            planCommentRepository.deleteByPlanCommentId(planCommentId);
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

            List<PlanCommentEntity> planCommentEntities = planCommentRepository.findByPlanIdOrderByPlanUploadDateDesc(planId);
            for (PlanCommentEntity planCommentEntity : planCommentEntities) {
                planCommentLikeRepository.deleteByPlanCommentId(planCommentEntity.getPlanCommentId());
                planCommentRepository.deleteByPlanCommentId(planCommentEntity.getPlanCommentId());
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
            return ResponseDto.databaseError();
        }
        return DeletePlanResponseDto.success();
    }

    //? 계획 리스트
    @Override
    public ResponseEntity<? super GetPlanListResponseDto> getPlanList(String filter, String sortOrder, String keyword, int page, int size) {
        try {
            LocalDateTime currentDate = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedCurrentDate = currentDate.format(formatter);

            List<PlanEntity> planEntities;

            switch (filter) {
                case "여행 전":
                    planEntities = (keyword != null && !keyword.isEmpty()) ? 
                        planRepository.findByStartDateAfterAndPlanTitleContaining(formattedCurrentDate, keyword) :
                        planRepository.findByStartDateAfter(formattedCurrentDate);
                    break;
                case "여행 완료":
                    planEntities = (keyword != null && !keyword.isEmpty()) ?
                        planRepository.findByEndDateBeforeAndPlanTitleContaining(formattedCurrentDate, keyword) :
                        planRepository.findByEndDateBefore(formattedCurrentDate);
                    break;
                case "여행 중":
                    planEntities = (keyword != null && !keyword.isEmpty()) ?
                        planRepository.findByStartDateBeforeAndEndDateAfterAndPlanTitleContaining(formattedCurrentDate, formattedCurrentDate, keyword) :
                        planRepository.findByStartDateBeforeAndEndDateAfter(formattedCurrentDate, formattedCurrentDate);
                    break;
                case "전체":
                default:
                    planEntities = (keyword != null && !keyword.isEmpty()) ? 
                        planRepository.findByPlanTitleContaining(keyword) :
                        planRepository.findAll();
                    break;
            }

            List<GetPlanListItemDto> planDtos = planEntities.stream().map(plan -> {
                UserEntity user = userRepository.findByUserEmail(plan.getUserEmail());
                String userNickname = (user != null) ? user.getUserNickname() : "Unknown";

                List<PlacesEntity> placesEntities = placesRepository.findByPlanId(plan.getPlanId());
                List<String> photoUrls = placesEntities.stream()
                    .flatMap(place -> photosRepository.findByPlacesId(place.getPlacesId()).stream())
                    .map(PhotosEntity::getPhotoUrl)
                    .collect(Collectors.toList());

                int commentCount = planCommentRepository.countByPlanId(plan.getPlanId());
                int markCount = planMarkRepository.countByPlanId(plan.getPlanId());
                String travelStatus = getTravelStatus(plan, currentDate);

                return new GetPlanListItemDto(
                    plan.getPlanId(),
                    userNickname,
                    plan.getPlanTitle(),
                    plan.getPlanUploadDate(),
                    markCount,
                    photoUrls,
                    commentCount,
                    travelStatus,
                    plan.getPlanCount()
                );
            }).collect(Collectors.toList());

            Comparator<GetPlanListItemDto> comparator;
            switch (sortOrder) {
                case "인기순":
                    comparator = Comparator.comparing(GetPlanListItemDto::getMarkCount);
                    break;
                case "댓글순":
                    comparator = Comparator.comparing(GetPlanListItemDto::getCommentCount);
                    break;
                case "최신순":
                default:
                    comparator = Comparator.comparing(GetPlanListItemDto::getPlanUploadDate);
                    break;
            }

            planDtos.sort(comparator.reversed());

            int start = (page - 1) * size;
            int end = Math.min(start + size, planDtos.size());

            List<GetPlanListItemDto> pagedPlanDtos;
            if (start > planDtos.size()) {
                pagedPlanDtos = Collections.emptyList(); 
            } else {
                pagedPlanDtos = planDtos.subList(start, end);
            }

            GetPlanListResponseDto responseBody = new GetPlanListResponseDto(pagedPlanDtos, planDtos.size(), (planDtos.size() + size - 1) / size, page);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    private String getTravelStatus(PlanEntity plan, LocalDateTime now) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
        LocalDateTime startDate = LocalDateTime.parse(plan.getStartDate(), formatter);
        LocalDateTime endDate = LocalDateTime.parse(plan.getEndDate(), formatter);
    
        if (endDate.isBefore(now)) {
            return "여행 완료";
        } else if (startDate.isAfter(now)) {
            return "여행 전";
        } else {
            return "여행 중";
        }
    }

    //? 계획 top3 리스트(조회순)
    @Override
    public ResponseEntity<? super GetPlanTop3ListResponseDto> getPlanTop3List() {
        try {
            List<PlanEntity> top3List = planRepository.findTop3ByOrderByPlanCountDesc();
            
            if (top3List.isEmpty()) {
                return GetPlanTop3ListResponseDto.existPlan();
            }
            
            List<GetTop3ListItemDto> planDtos = top3List.stream().map(plan -> {
                int markCount = (int) planMarkRepository.countByPlanId(plan.getPlanId());
                
                return new GetTop3ListItemDto(
                    plan.getPlanId(),
                    plan.getPlanTitle(),
                    plan.getPlanCount(),
                    markCount,
                    plan.getPlanUploadDate(),
                    plan.getPlanImage()
                );
            }).collect(Collectors.toList());
    
            return GetPlanTop3ListResponseDto.success(planDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 자신이 작성한 계획 들고오기
    @Override
    public ResponseEntity<? super GetPlanMyListResponseDto> getPlanMyList(String userEmail) {
        try {
            List<PlanEntity> planEntity = planRepository.findByUserEmailOrderByPlanUploadDateDesc(userEmail);
            if (planEntity == null) {
                return GetPlanMyListResponseDto.notExistPlan();
            }

            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return GetPlanMyListResponseDto.notUser();
            }

            List<GetPlanMyListAndMarkItemDto> myPlan = planEntity.stream().map(plan -> 
            new GetPlanMyListAndMarkItemDto(
                plan.getPlanId(),
                plan.getPlanTitle(),
                plan.getStartDate(),
                plan.getEndDate(),
                plan.getPlanImage()
            )
        ).collect(Collectors.toList());

        return GetPlanMyListResponseDto.success(myPlan);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 자신이 마크한 계획 가져오기
    @Override
    public ResponseEntity<? super GetPlanMyMarkListResponseDto> getPlanMyMarkList(String userEmail) {
        try {
            List<PlanMarkEntity> planMarkList = planMarkRepository.findByUserEmail(userEmail);
            if(planMarkList == null) {
                return GetPlanMyMarkListResponseDto.notExistPlan();
            }

            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return GetPlanMyMarkListResponseDto.notExistUser();
            }

            List<GetPlanMyListAndMarkItemDto> markedPlanDtos = planMarkList.stream()
            .map(mark -> {
                PlanEntity plan = planRepository.findById(mark.getPlanId()).orElse(null);
                if (plan == null) return null;
                return new GetPlanMyListAndMarkItemDto(
                    plan.getPlanId(),
                    plan.getPlanTitle(),
                    plan.getStartDate(),
                    plan.getEndDate(),
                    plan.getPlanImage()
                );
            })
            .collect(Collectors.toList());

            return GetPlanMyMarkListResponseDto.success(markedPlanDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 자신이 게획에 작성한 메모 리스트 가져오기
    @Override
    public ResponseEntity<? super GetPlanMyNoteListResponseDto> getPlanMyNoteList(String userEmail) {
        try {
            List<PlanEntity> planEntity = planRepository.findByUserEmailOrderByPlanUploadDateDesc(userEmail);
            if (planEntity == null) {
                return GetPlanMyListResponseDto.notExistPlan();
            }

            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) {
                return GetPlanMyMarkListResponseDto.notExistUser();
            }

            List<GetPlanMyNoteListItemDto> myNoteList = planEntity.stream()
            .map(plan -> {
                List<PlacesEntity> places = placesRepository.findByPlanId(plan.getPlanId());

                List<String> notes = places.stream()
                    .map(PlacesEntity::getNote)
                    .collect(Collectors.toList());
                
                List<String> notes2 = places.stream()
                    .map(PlacesEntity::getNote2)
                    .collect(Collectors.toList());

                return new GetPlanMyNoteListItemDto(
                    plan.getPlanId(),
                    plan.getPlanTitle(),
                    notes,  
                    notes2  
                );
            })
            .collect(Collectors.toList());

            return GetPlanMyNoteListResponseDto.success(myNoteList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 특정 계획 댓글 리스트
    @Override
    public ResponseEntity<? super GetPlanCommentListResponseDto> getPlanCommentList(int planId, String sortType) {
        try {
            PlanEntity planEntity = planRepository.findByPlanId(planId);
            if (planEntity == null) {
                return GetPlanCommentListResponseDto.notExistPlan();
            }

            List<PlanCommentEntity> comments = planCommentRepository.findByPlanIdOrderByPlanUploadDateDesc(planId);
            if (comments.isEmpty()) {
                return GetPlanCommentListResponseDto.notExistComment();
            }

            List<GetPlanCommentListItemDto> commentDtos = comments.stream().map(comment -> {
                int likeCount = (int) planCommentLikeRepository.countLikesByPlanCommentId(comment.getPlanCommentId());

                List<String> likedUserEmails = planCommentLikeRepository.findByPlanCommentId(comment.getPlanCommentId())
                .stream()
                .map(PlanCommentLikeEntity::getUserEmail)
                .collect(Collectors.toList());

                return new GetPlanCommentListItemDto(
                    comment.getPlanCommentId(),
                    comment.getUserEmail(),
                    comment.getPlanId(),
                    comment.getUserNickname(),
                    comment.getUserProfile(),
                    comment.getPlanContent(),
                    comment.getPlanUploadDate().toString(),
                    likeCount,
                    likedUserEmails
                );
            }).collect(Collectors.toList());

            if (sortType == null || sortType.isEmpty() || "인기순".equals(sortType)) {
                commentDtos.sort(Comparator.comparingInt(GetPlanCommentListItemDto::getLikeCount).reversed());
            } else if ("최신순".equals(sortType)) {
                commentDtos.sort(Comparator.comparing(GetPlanCommentListItemDto::getPlanUploadDate).reversed());
            }

            return GetPlanCommentListResponseDto.success(commentDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    //? 내가 작성한 계획의 사진 리스트
    @Override
    public ResponseEntity<? super GetPlanMyPhotoListResponseDto> getPlanMyPhotoList(String userEmail) {
        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if (userEntity == null) {
                return GetPlanMyPhotoListResponseDto.notExistUser();
            }

            List<PlanEntity> planEntities = planRepository.findByUserEmailOrderByPlanId(userEmail);
            if (planEntities == null) {
                return GetPlanMyPhotoListResponseDto.notExistPlan();
            }

            List<GetPlanMyPhotoListItemDto> photoListItems = new ArrayList<>();

            for (PlanEntity planEntity : planEntities) {
                List<PlacesEntity> places = placesRepository.findByPlanId(planEntity.getPlanId());

                List<String> photoUrls = places.stream()
                    .flatMap(place -> photosRepository.findByPlacesId(place.getPlacesId()).stream())
                    .map(PhotosEntity::getPhotoUrl)
                    .collect(Collectors.toList());

                GetPlanMyPhotoListItemDto photoList = new GetPlanMyPhotoListItemDto(
                    planEntity.getPlanId(),
                    planEntity.getPlanTitle(),
                    photoUrls
                );

                photoListItems.add(photoList);
            }

            return GetPlanMyPhotoListResponseDto.success(photoListItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    }
}