package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.service.PlanService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;

    //? 여행계획작성
    @PostMapping("/post")
    public ResponseEntity<? super PostPlanResponseDto> postPlan(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostPlanRequestDto postPlanRequestDto
    ) {
        ResponseEntity<? super PostPlanResponseDto> response = planService.postPlan(userEmail, postPlanRequestDto);
        return response;
    }

    //? 특정여행계획 상세 가져오기
    @GetMapping("/{planId}")
    public ResponseEntity<? super GetPlanResponseDto> getPlan(
        @PathVariable(name = "planId") int planId
        ) {
        return planService.getPlan(planId);
    }

    @PatchMapping("")
    public ResponseEntity<? super PatchPlanResponseDto> pathPlan(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchPlanRequestDto requestBody
    ) {
        ResponseEntity<? super PatchPlanResponseDto> response = planService.patchPlan(userEmail, requestBody);
        return response;
    }
}
