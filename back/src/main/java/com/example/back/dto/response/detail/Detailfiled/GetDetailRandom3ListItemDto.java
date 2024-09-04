package com.example.back.dto.response.detail.Detailfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetDetailRandom3ListItemDto {
    private int detailId;
    private String detailTitle;
    GetDetailImageDto detailImageDto;
}
