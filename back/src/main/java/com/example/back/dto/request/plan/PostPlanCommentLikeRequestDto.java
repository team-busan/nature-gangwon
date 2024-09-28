package com.example.back.dto.request.plan;

import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostPlanCommentLikeRequestDto {
    @Min(1)
    private int planId;

    @Min(1)
    private int planCommentId;
}
