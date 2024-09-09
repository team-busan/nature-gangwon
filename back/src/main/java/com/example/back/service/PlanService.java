package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.plan.PatchPlanCommentRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentLikeRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentRequestDto;
import com.example.back.dto.request.plan.PostPlanMarkRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.DeletePlanCommentResponseDto;
import com.example.back.dto.response.plan.DeletePlanResponseDto;
import com.example.back.dto.response.plan.GetPlanCommentListResponseDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.GetPlanTop3ListResponseDto;
import com.example.back.dto.response.plan.GetPlanListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyMarkListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyNoteListResponseDto;
import com.example.back.dto.response.plan.PatchPlanCommentResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentLikeResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.dto.response.plan.PostPlanMarkResponseDto;
import com.example.back.dto.response.plan.PostPlanResponseDto;

public interface PlanService {
    ResponseEntity<? super PostPlanResponseDto> postPlan(String userEmail, PostPlanRequestDto dto);
    ResponseEntity<? super GetPlanResponseDto> getPlan(int planId);
    ResponseEntity<? super PatchPlanResponseDto> patchPlan(String userEmail, PatchPlanRequestDto dto);
    ResponseEntity<? super PostPlanCommentResponseDto> postPlanComment(String userEmail, PostPlanCommentRequestDto dto);
    ResponseEntity<? super PatchPlanCommentResponseDto> patchPlanComment(String userEmail, PatchPlanCommentRequestDto dto);
    ResponseEntity<? super PostPlanCommentLikeResponseDto> postPlanCommentLike(String userEmail, PostPlanCommentLikeRequestDto dto);
    ResponseEntity<? super PostPlanMarkResponseDto> postPlanMark(String userEmail, PostPlanMarkRequestDto dto);
    ResponseEntity<? super DeletePlanCommentResponseDto> deletePlanComment(String userEmail, int planCommentId);
    ResponseEntity<? super DeletePlanResponseDto> deletePlan(String userEmail, int planId);
    ResponseEntity<? super GetPlanListResponseDto> getPlanList(String filter, String sortOrder, String keyword, int page, int size);
    ResponseEntity<? super GetPlanTop3ListResponseDto> getPlanTop3List();
    ResponseEntity<? super GetPlanMyListResponseDto> getPlanMyList(String userEmail);
    ResponseEntity<? super GetPlanMyMarkListResponseDto> getPlanMyMarkList(String userEmail);
    ResponseEntity<? super GetPlanMyNoteListResponseDto> getPlanMyNoteList(String userEmail);
    ResponseEntity<? super GetPlanCommentListResponseDto> getPlanCommentList(int planId, String sortType);
}
