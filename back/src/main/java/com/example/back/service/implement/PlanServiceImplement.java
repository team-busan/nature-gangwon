package com.example.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto.PostPlanPlaceRequestDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.entity.DaysEntity;
import com.example.back.entity.PlacesEntity;
import com.example.back.entity.PlanEntity;
import com.example.back.entity.UserEntity;
import com.example.back.repository.DaysRepository;
import com.example.back.repository.LocationBasedRepository;
import com.example.back.repository.PlacesRepository;
import com.example.back.repository.PlanRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.PlanService;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanServiceImplement implements PlanService{
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final DaysRepository daysRepository;
    private final PlacesRepository placesRepository;
    private final LocationBasedRepository locationBasedRepository;

    @Override
    public ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto) {
        try{
            UserEntity userEntity = userRepository.findByUserEmail(dto.getUserEmail());
            if(userEntity == null) return PostPlanResponseDto.notExistUser();

            PlanEntity planEntity = new PlanEntity(userEntity, dto);
            planRepository.save(planEntity);
            
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = dateFormat.parse(dto.getStartDate());
            Date endDate = dateFormat.parse(dto.getEndDate());

            long diffInMillies = Math.abs(endDate.getTime() - startDate.getTime());
            long numberOfDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS) + 1;

            for (int i = 0; i < numberOfDays; i++) {
                DaysEntity daysEntity = new DaysEntity();
                daysEntity.setPlanId(planEntity.getPlanId());
                daysEntity.setDaysId(i + 1);  // daysId를 1부터 시작
                daysRepository.save(daysEntity);
            }

            List<PostPlanPlaceRequestDto> schedules = dto.getSchedules();
                for (PostPlanPlaceRequestDto schedule : schedules) {
                    if (schedule.getDay() < 1 || schedule.getDay() > numberOfDays) {
                        return PostPlanResponseDto.invalidDayOrBasedId();
                    }
                    if (!locationBasedRepository.existsById(schedule.getLocationBasedId())) {
                        return PostPlanResponseDto.invalidDayOrBasedId();
                    }

                    PlacesEntity placesEntity = new PlacesEntity();
                    placesEntity.setDaysId(schedule.getDay());
                    placesEntity.setLocationBasedId(schedule.getLocationBasedId());
                    placesEntity.setNote(schedule.getNote());
                    placesEntity.setNote2(schedule.getNote2());
                    placesEntity.setSigunguCode(schedule.getSigunguCode());
                    placesEntity.setTitle(schedule.getTitle());
                    placesRepository.save(placesEntity);
                }
        }catch (Exception e) {
            e.printStackTrace();
            return PostPlanResponseDto.databaseError();
        }
        return PostPlanResponseDto.success();
    }
    
}
