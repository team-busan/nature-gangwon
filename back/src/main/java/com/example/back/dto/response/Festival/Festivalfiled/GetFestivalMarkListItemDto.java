package com.example.back.dto.response.Festival.Festivalfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetFestivalMarkListItemDto {
    private int festivalId;
    private String festivalTitle;
    private String festivalStartDate;
    private String festvailEndDate;
    private String festivalFirstImage;
    private String festivalImage3;
}
