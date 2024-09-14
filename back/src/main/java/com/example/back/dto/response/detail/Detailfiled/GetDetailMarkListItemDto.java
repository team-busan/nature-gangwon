package com.example.back.dto.response.detail.Detailfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetDetailMarkListItemDto {
    private int detailId;
    private String detailTitle;
    private String detailFirstImge;
    private String detailImage3;
}
