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

    @Min(1)
    private int detailCommentId;
   

    @Min(1)
    private int score;

    @NotBlank
    private String detailContent;
}
