package com.example.back.dto.response.detail;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailImageDto;
import com.example.back.entity.DetailDescriptionEntity;
import com.example.back.entity.DetailEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetDetailResponseDto extends ResponseDto {
    private DetailEntity detailEntity;
    private DetailDescriptionEntity detailDescriptionEntity;
    private GetDetailImageDto getDetailImageDto;
    private List<String> markedUserEmails;

    public GetDetailResponseDto(DetailEntity detailEntity, GetDetailImageDto detailImageDto, DetailDescriptionEntity detailDescriptionEntity, List<String> markedUserEmails){
        super();
        this.detailEntity = detailEntity;
        this.getDetailImageDto = detailImageDto;
        this.detailDescriptionEntity = detailDescriptionEntity;
        this.markedUserEmails = markedUserEmails;
    }

    public static ResponseEntity<GetDetailResponseDto> success(DetailEntity detailEntity, DetailDescriptionEntity detailDescriptionEntity, GetDetailImageDto getDetailImageDto, List<String> markedUserEmails){
        GetDetailResponseDto responseBody = new GetDetailResponseDto();
        responseBody.setDetailEntity(detailEntity);
        responseBody.setDetailDescriptionEntity(detailDescriptionEntity);
        responseBody.setGetDetailImageDto(getDetailImageDto);
        responseBody.setMarkedUserEmails(markedUserEmails);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getDetailFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_DETAIL, ResponseMessage.NOT_EXIST_DETAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
