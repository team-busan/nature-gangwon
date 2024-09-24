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

import com.example.back.dto.request.detail.PatchDetailCommentRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentLikeRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;
import com.example.back.dto.request.detail.PostDetailMarkRequestDto;
import com.example.back.dto.response.detail.PostDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailMarkResponseDto;
import com.example.back.dto.response.detail.GetDetailListResponseDto;
import com.example.back.dto.response.detail.GetDetailMyMarkListResponseDto;
import com.example.back.dto.response.detail.GetDetailRandom3ListResponseDto;
import com.example.back.dto.response.detail.GetDetailResponseDto;
import com.example.back.dto.response.detail.PatchDetailCommentResponseDto;
import com.example.back.dto.response.detail.PostDetailCommentLikeResponseDto;
import com.example.back.dto.response.detail.DeleteDetailCommentResponseDto;
import com.example.back.dto.response.detail.GetDetailCommentListResponseDto;
import com.example.back.service.DetailService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/destination")
@RequiredArgsConstructor
public class DetailController {
    
    private final DetailService detailService;

    //? 시군구 코드가 없으면 전체 리스트
    @GetMapping("/list")
    public ResponseEntity<? super GetDetailListResponseDto> getDetailList(
        @RequestParam(name = "detailSigungucode", required = false) String detailSigungucode,
        @RequestParam(name = "keyword", required = false) String searchKeword,
        @RequestParam(name = "sort", defaultValue = "전체") String sortOrder,
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "16") int size
    ) {
        ResponseEntity<? super GetDetailListResponseDto> response = detailService.getDetailList(detailSigungucode,searchKeword, sortOrder, page, size);
        return response;
    }

    //? 특정 관광지 가져오기
    @GetMapping("/{detailContentid}")
    public ResponseEntity<? super GetDetailResponseDto> getDetail(
        @PathVariable(name = "detailContentid") String detailContentid 
    ) {
        return detailService.getDetail(detailContentid);
    }
    //? 댓글 요청
    @PostMapping("/post-comment")
    public ResponseEntity<? super PostDetailCommentResponseDto> postComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostDetailCommentRequsetDto requsetBody
    ){
        ResponseEntity<? super PostDetailCommentResponseDto> response = detailService.postComment(userEmail, requsetBody);
        return response;

    }

    //? 관광지 댓글 좋아요
    @PostMapping("/comment-like")
    public ResponseEntity<? super PostDetailCommentLikeResponseDto> postCommentLike(
        @AuthenticationPrincipal String userEmail,
        @RequestBody @Valid PostDetailCommentLikeRequestDto requestBody
    ){
        ResponseEntity<? super PostDetailCommentLikeResponseDto> response = detailService.postDetailCommentLike(userEmail, requestBody);
        return response;
    }

    //? 관광지 댓글 삭제
    @DeleteMapping("/delete-comment/{detailCommentId}")
    public ResponseEntity<? super DeleteDetailCommentResponseDto> deleteDetailComment(
        @AuthenticationPrincipal String userEmail,
        @PathVariable(name = "detailCommentId") int detailCommentId
    ){
        ResponseEntity<? super DeleteDetailCommentResponseDto> response = detailService.deleteDetailComment(userEmail, detailCommentId);
        return response;
    }

    //? 댓글 수정
    @PatchMapping("/patch-comment")
    public ResponseEntity<? super PatchDetailCommentResponseDto> patchDetailComment(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PatchDetailCommentRequestDto requestBody
    ){
        ResponseEntity<? super PatchDetailCommentResponseDto> response = detailService.patchDetailComment(userEmail, requestBody);
        return response;
    }

    //? 관광지 랜덤3개 리스트
    @GetMapping("/random")
    public ResponseEntity<? super GetDetailRandom3ListResponseDto> getRandom3List()
    {
        ResponseEntity<? super GetDetailRandom3ListResponseDto> response = detailService.getRandom3List();
        return response;
    }

    //? 관광지 즐겨찾기
    @PostMapping("/mark")
    public ResponseEntity<? super PostDetailMarkResponseDto> postDetailMark(
        @AuthenticationPrincipal String userEmail,
        @Valid @RequestBody PostDetailMarkRequestDto requestBody
    ){
        ResponseEntity<? super PostDetailMarkResponseDto> response = detailService.postDetailMark(userEmail, requestBody);
        return response;
    }

    //? 내가 즐겨찾기한 관광지 리스트
    @GetMapping("/mark-list")
    public ResponseEntity<? super GetDetailMyMarkListResponseDto> getDetailMarkList(
        @AuthenticationPrincipal String userEamil
    ){
        ResponseEntity <? super GetDetailMyMarkListResponseDto> response = detailService.getDetailMarkList(userEamil);
        return response;
    }

    //? 관광지 댓글 리스트
    @GetMapping("/comment/{detailId}")
    public ResponseEntity<? super GetDetailCommentListResponseDto> getDetailCommentList(
        @PathVariable(name = "detailId") int detailId,
        @RequestParam(value = "sort", defaultValue = "like") String sortType

    ){
        ResponseEntity<? super GetDetailCommentListResponseDto> response = detailService.getDetailCommentList(detailId, sortType);
        return response;
    }
}
