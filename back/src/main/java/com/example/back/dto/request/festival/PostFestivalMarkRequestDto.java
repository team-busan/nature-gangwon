package com.example.back.dto.request.festival;

import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostFestivalMarkRequestDto {
    @Min(1)
    private int festivalId;
}
