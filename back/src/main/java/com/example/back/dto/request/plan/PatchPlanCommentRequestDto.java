package com.example.back.dto.request.plan;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PatchPlanCommentRequestDto {
    @Min(1)
    private int planId;

    @Min(1)
    private int planCommentId;

    @NotBlank
    private String planContent;
}
