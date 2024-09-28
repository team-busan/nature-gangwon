package com.example.back.dto.response.Festival.Festivalfiled;

import lombok.Data;

import java.util.List;

@Data
public class UpComingFestivalDto {
    private long totalData;
    private int totalPage;
    private int currentPage;
    private List<GetFestivalListItemDto> festivals;

    public UpComingFestivalDto(long totalData, int totalPage, int currentPage, List<GetFestivalListItemDto> festivals) {
        this.totalData = totalData;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
        this.festivals = festivals;
    }

}
