package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;

public interface PlanService {
    ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto);
    ResponseEntity<? super GetPlanResponseDto> getPlan(int planId);
    ResponseEntity<? super PatchPlanResponseDto> patchPlan(String userEmail, PatchPlanRequestDto dto);
}
