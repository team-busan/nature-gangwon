package com.example.back.dto.request.plan;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostPlanRequestDto {
    @NotBlank
    private String userEmail;
    @NotBlank
    private String startDate;
    @NotBlank
    private String endDate;
    @NotBlank
    private String planTitle;
    @NotEmpty
    private List<PostPlanPlaceRequestDto> schedules;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class PostPlanPlaceRequestDto {
        @NotBlank
        private int locationBasedId;
        private String note;
        private String note2;
        @NotBlank
        private String sigunguCode;
        @NotBlank
        private String title;
        @NotBlank
        private int day;
    }
}
