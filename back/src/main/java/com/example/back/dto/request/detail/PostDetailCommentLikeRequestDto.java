package com.example.back.dto.request.detail;

import jakarta.validation.constraints.Min;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostDetailCommentLikeRequestDto {
    @Min(1)
    private int detailId;
    @Min(1)
    private int detailCommentId;
}
