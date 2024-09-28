package com.example.back.dto.request.plan;

import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostPlanMarkRequestDto {
    @Min(1)
    private int planId;
}
