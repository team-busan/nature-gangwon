package com.example.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto.PatchPlanPlaceRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto.PostPlanPlaceRequestDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.dto.response.plan.planfiled.GetPlaceListItemDto;
import com.example.back.entity.LocationBasedEntity;
import com.example.back.entity.PhotosEntity;
import com.example.back.entity.PlacesEntity;
import com.example.back.entity.PlanEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.LocationBasedRepository;
import com.example.back.repository.PhotosRepository;
import com.example.back.repository.PlacesRepository;
import com.example.back.repository.PlanRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.PlanService;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

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

    //? 계획 작성하기 
    @Override
    public ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto) {
        try{
            UserEntity userEntity = userRepository.findByUserEmail(dto.getUserEmail());
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

            List<PlacesEntity> placesEntity = placesRepository.findByPlanId(planId);
            List<GetPlaceListItemDto> getPlaceListItemDtos = new ArrayList<>();

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
                getPlaceListItemDtos.add(placeDto);
            }
            planEntity.increasePlanCount();
            planRepository.save(planEntity);
            return GetPlanResponseDto.success(planEntity, getPlaceListItemDtos);
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
}
