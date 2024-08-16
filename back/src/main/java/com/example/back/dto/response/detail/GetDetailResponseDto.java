package com.example.back.dto.response.detail;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.detail.Detailfiled.GetDetailImageDto;
import com.example.back.entity.DetailCommentEntity;
import com.example.back.entity.DetailDescriptionEntity;
import com.example.back.entity.DetailEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetDetailResponseDto extends ResponseDto {
    private DetailEntity detailEntity;
    private DetailDescriptionEntity detailDescriptionEntity;
    private GetDetailImageDto getDetailImageDto;
    private List<DetailCommentEntity> detailCommentList;

    public GetDetailResponseDto(DetailEntity detailEntity, GetDetailImageDto detailImageDto, DetailDescriptionEntity detailDescriptionEntity, List<DetailCommentEntity> detailCommentList){
        super();
        this.detailEntity = detailEntity;
        this.getDetailImageDto = detailImageDto;
        this.detailDescriptionEntity = detailDescriptionEntity;
        this.detailCommentList = detailCommentList;
    }

    public static ResponseEntity<GetDetailResponseDto> success(DetailEntity detailEntity, DetailDescriptionEntity detailDescriptionEntity, GetDetailImageDto getDetailImageDto, List<DetailCommentEntity> detailCommentList){
        GetDetailResponseDto responseBody = new GetDetailResponseDto();
        responseBody.setDetailEntity(detailEntity);
        responseBody.setDetailDescriptionEntity(detailDescriptionEntity);
        responseBody.setGetDetailImageDto(getDetailImageDto);
        responseBody.setDetailCommentList(detailCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> getDetailFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
