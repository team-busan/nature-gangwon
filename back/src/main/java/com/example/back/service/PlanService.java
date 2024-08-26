package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.plan.PatchPlanCommentRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentLikeRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.DeletePlanCommentResponseDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.PatchPlanCommentResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentLikeResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;

public interface PlanService {
    ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto);
    ResponseEntity<? super GetPlanResponseDto> getPlan(int planId);
    ResponseEntity<? super PatchPlanResponseDto> patchPlan(String userEmail, PatchPlanRequestDto dto);
    ResponseEntity<? super PostPlanCommentResponseDto> postPlanComment(String userEmail, PostPlanCommentRequestDto dto);
    ResponseEntity<? super PatchPlanCommentResponseDto> patchPlanComment(String userEmail, PatchPlanCommentRequestDto dto);
    ResponseEntity<? super PostPlanCommentLikeResponseDto> postPlanCommentLike(String userEmail, PostPlanCommentLikeRequestDto dto);
    //ResponseEntity<? super DeletePlanCommentResponseDto> deleteDetailComment(String userEmail, int postCommentId, int planId);
}
