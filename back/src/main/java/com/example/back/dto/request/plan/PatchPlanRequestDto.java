package com.example.back.dto.request.plan;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PatchPlanRequestDto {
    @Min(1)
    private int planId;

    @NotBlank
    private String startDate;

    @NotBlank
    private String endDate;

    @NotBlank
    private String planTitle;

    @NotEmpty
    private List<PatchPlanPlaceRequestDto> patchPlanList;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class PatchPlanPlaceRequestDto {
        @NotBlank
        private int locationBasedId;

        @NotBlank
        private int dayNumber;

        private String note;

        private String note2;

        private List<String> photoUrls;
    }
}
