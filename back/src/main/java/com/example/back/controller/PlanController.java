package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;
import com.example.back.service.PlanService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;

    @PostMapping("/post")
    public ResponseEntity<? super PostPlanResponseDto> postPlan(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostPlanRequestDto postPlanRequestDto
    ) {
        ResponseEntity<? super PostPlanResponseDto> response = planService.postPlan(userEmail, postPlanRequestDto);
        return response;
    }
}
