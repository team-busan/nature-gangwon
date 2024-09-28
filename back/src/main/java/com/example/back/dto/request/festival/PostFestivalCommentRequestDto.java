package com.example.back.dto.request.festival;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostFestivalCommentRequestDto {
    @Min(1)
    private int festivalId;

    @NotBlank
    private String festivalContent;

    @Min(1)
    private int score;
}
