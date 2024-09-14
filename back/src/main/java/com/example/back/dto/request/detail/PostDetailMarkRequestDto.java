package com.example.back.dto.request.detail;

import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostDetailMarkRequestDto {
    @Min(1)
    private int detailId;
}
