package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.plan.PatchPlanCommentRequestDto;
import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentLikeRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentRequestDto;
import com.example.back.dto.request.plan.PostPlanMarkRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;
import com.example.back.dto.response.plan.GetPlanListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyListResponseDto;
import com.example.back.dto.response.plan.GetPlanMyMarkListResponseDto;
import com.example.back.dto.response.plan.DeletePlanCommentResponseDto;
import com.example.back.dto.response.plan.DeletePlanResponseDto;
import com.example.back.dto.response.plan.GetPlanResponseDto;
import com.example.back.dto.response.plan.GetPlanTop3ListResponseDto;
import com.example.back.dto.response.plan.PatchPlanCommentResponseDto;
import com.example.back.dto.response.plan.PatchPlanResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentLikeResponseDto;
import com.example.back.dto.response.plan.PostPlanCommentResponseDto;
import com.example.back.dto.response.plan.PostPlanMarkResponseDto;
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

    //? 여행 계획 수정하기
    @PatchMapping("/patch")
    public ResponseEntity<? super PatchPlanResponseDto> pathPlan(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchPlanRequestDto requestBody
    ) {
        ResponseEntity<? super PatchPlanResponseDto> response = planService.patchPlan(userEmail, requestBody);
        return response;
    }

    //? 여행 계획 댓글 남기기
    @PostMapping("/post-comment")
    public ResponseEntity<? super PostPlanCommentResponseDto> postPlanComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostPlanCommentRequestDto requestBody
    ) {
        ResponseEntity<? super PostPlanCommentResponseDto> response = planService.postPlanComment(userEmail, requestBody);
        return response;
    }

    //? 계획 댓글 수정하기
    @PatchMapping("/patch-comment")
    public ResponseEntity<? super PatchPlanCommentResponseDto> patchPlanComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchPlanCommentRequestDto requestBody
    ) {
        ResponseEntity<? super PatchPlanCommentResponseDto> response = planService.patchPlanComment(userEmail, requestBody);
        return response;
    }

    //? 계획 댓글 좋아요
    @PostMapping("/comment-like")
    public ResponseEntity<? super PostPlanCommentLikeResponseDto> postPlanCommentLike(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostPlanCommentLikeRequestDto requestBody
    ) {
        ResponseEntity<? super PostPlanCommentLikeResponseDto> response = planService.postPlanCommentLike(userEmail, requestBody);
        return response;
    }

    @PostMapping("/mark")
    public ResponseEntity<? super PostPlanMarkResponseDto> postPlanMark(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostPlanMarkRequestDto requestBody
    ) {
        ResponseEntity<? super PostPlanMarkResponseDto> response = planService.postPlanMark(userEmail, requestBody);
        return response;
    }

    //? 계획 댓글 삭제
    @DeleteMapping("/delete-comment/{planCommentId}")
    public ResponseEntity<? super DeletePlanCommentResponseDto> deletePlanComment(
        @AuthenticationPrincipal String userEmail,
        @PathVariable(name = "planCommentId") int planCommentId
    ) {
        ResponseEntity<? super DeletePlanCommentResponseDto> response = planService.deletePlanComment(userEmail, planCommentId);
        return response;
    }

    //? 계획 삭제
    @DeleteMapping("/delete/{planId}")
    public ResponseEntity<? super DeletePlanResponseDto> deletePlan(
        @AuthenticationPrincipal String userEmail,
        @PathVariable(name = "planId") int planId
    ) {
        ResponseEntity<? super DeletePlanResponseDto> response = planService.deletePlan(userEmail, planId);
        return response;
    }

    //? 계획 리스트
    @GetMapping("/list")
    public ResponseEntity<? super GetPlanListResponseDto> getPlans(
        @RequestParam(value = "filter", defaultValue = "전체") String filter,
        @RequestParam(value = "sort", defaultValue = "조회순") String sortOrder,
        @RequestParam(value = "keyword") String keyword,
        @RequestParam(name = "page") int page,
        @RequestParam(name = "size") int size
    ) {
        ResponseEntity<? super GetPlanListResponseDto> response = planService.getPlanList(filter, sortOrder, keyword, page, size);
        return response;
    }

    //? 계획 top3(조회순) 리스트
    @GetMapping("/top3")
    public ResponseEntity<? super GetPlanTop3ListResponseDto> getPlanTop3List() {
        ResponseEntity<? super GetPlanTop3ListResponseDto> response = planService.getPlanTop3List();
        return response;
    }

    //? 자신이 작성한 계획 리스트
    @GetMapping("/my-list")
    public ResponseEntity<? super GetPlanMyListResponseDto> getPlanMyList(
        @AuthenticationPrincipal String userEmail
    ) {
        ResponseEntity<? super GetPlanMyListResponseDto> response = planService.getPlanMyList(userEmail);
        return response;
    }

    //? 자신이 마크한 계획 리스트
    @GetMapping("/mark-list")
    public ResponseEntity<? super GetPlanMyMarkListResponseDto> getPlanMyMarkList(
        @AuthenticationPrincipal String userEmail
    ) {
        ResponseEntity<? super GetPlanMyMarkListResponseDto> response = planService.getPlanMyMarkList(userEmail);
        return response;
    }
}
