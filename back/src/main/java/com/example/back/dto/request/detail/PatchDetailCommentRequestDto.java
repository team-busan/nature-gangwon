package com.example.back.dto.request.detail;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PatchDetailCommentRequestDto {
    @Min(1)
    private int detailId;

    @NotBlank
    private String detailContent;

    @Min(1)
    private int score;
}
