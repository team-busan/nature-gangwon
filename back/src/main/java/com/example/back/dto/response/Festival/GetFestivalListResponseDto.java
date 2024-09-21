package com.example.back.dto.response.Festival;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.UpComingFestivalDto;

import lombok.Getter;

@Getter
public class GetFestivalListResponseDto extends ResponseDto {
    private List<GetFestivalListItemDto> onGoing;
    private UpComingFestivalDto upComing;
    private String randomFestivalImage;

    public GetFestivalListResponseDto(List<GetFestivalListItemDto> onGoing, List<GetFestivalListItemDto> upComingFestivals,
    long totalData, int totalPage, int currentPage, String randomFestivalImage){
        super();
        this.onGoing = onGoing;
        this.upComing = new UpComingFestivalDto(totalData, totalPage, currentPage, upComingFestivals);
        this.randomFestivalImage = randomFestivalImage;
    }
    public static ResponseEntity<GetFestivalListResponseDto> succes(List<GetFestivalListItemDto> onGoing, List<GetFestivalListItemDto> upComingFestivals,
    long totalData, int totalPage, int currentPage,String randomFestivalImage){
        GetFestivalListResponseDto responseBody = new GetFestivalListResponseDto(onGoing, upComingFestivals, totalData, totalPage, currentPage, randomFestivalImage);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getFestivalListFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_FESTIVAL, ResponseMessage.NOT_EXIST_FESTIVAL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
