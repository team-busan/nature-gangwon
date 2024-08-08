package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;

public interface PlanService {
    ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto);
}
