package com.example.back.dto.request.festival;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PatchFestivalCommentRequestDto {
    @Min(1)
    private int festivalId;

    @Min(1)
    private int festivalCommentId;

    @Min(1)
    private int score;

    @NotBlank
    private String festivalContent;
}
