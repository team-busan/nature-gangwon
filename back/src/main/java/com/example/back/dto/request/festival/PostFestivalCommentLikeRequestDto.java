package com.example.back.dto.request.festival;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Min;

@NoArgsConstructor
@Data
public class PostFestivalCommentLikeRequestDto {
    @Min(1)
    private int festivalId;

    @Min(1)
    private int festivalCommentId;
}
