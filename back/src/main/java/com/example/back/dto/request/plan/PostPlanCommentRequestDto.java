package com.example.back.dto.request.plan;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostPlanCommentRequestDto {
    @Min(1)
    private int planId;

    @NotBlank
    private String planContent;
}
