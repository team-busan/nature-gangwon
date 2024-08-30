package com.example.back.dto.response.Festival;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalCommentListItemDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalImageDto;
import com.example.back.entity.FestivalDescriptionEntity;
import com.example.back.entity.FestivalEntity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetFestivalResponseDto extends ResponseDto {
    private FestivalEntity festivalEntity;
    private FestivalDescriptionEntity festivalDescriptionEntity;
    private GetFestivalImageDto getFestivalImageDto;
    private List<GetFestivalCommentListItemDto> festivalCommentList;
    
    public GetFestivalResponseDto(FestivalEntity festivalEntity, FestivalDescriptionEntity festivalDescriptionEntity, GetFestivalImageDto festivalImageDto, List<GetFestivalCommentListItemDto> festivalCommentList){
        super();
        this.festivalEntity = festivalEntity;
        this.festivalDescriptionEntity = festivalDescriptionEntity;
        this.getFestivalImageDto = festivalImageDto;
        this.festivalCommentList = festivalCommentList;
    }

    public static ResponseEntity<GetFestivalResponseDto> success(FestivalEntity festivalEntity, FestivalDescriptionEntity festivalDescriptionEntity, GetFestivalImageDto festivalImageDto, List<GetFestivalCommentListItemDto> festivalCommentList){
        GetFestivalResponseDto responseBody = new GetFestivalResponseDto();
        responseBody.setFestivalEntity(festivalEntity);
        responseBody.setFestivalDescriptionEntity(festivalDescriptionEntity);
        responseBody.setGetFestivalImageDto(festivalImageDto);
        responseBody.setFestivalCommentList(festivalCommentList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

    public static ResponseEntity<ResponseDto> getFestivalFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
