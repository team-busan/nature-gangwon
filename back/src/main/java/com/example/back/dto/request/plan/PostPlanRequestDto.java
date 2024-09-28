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
    private String startDate;

    @NotBlank
    private String endDate;

    @NotBlank
    private String planTitle;

    private String planImage;

    @NotEmpty
    private List<PostPlanPlaceRequestDto> postPlanList;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class PostPlanPlaceRequestDto {
        @NotBlank
        private int locationBasedId;

        @NotBlank
        private int dayNumber;

        private String note;

        private String note2;

        private List<String> photoUrls;
    }
}
