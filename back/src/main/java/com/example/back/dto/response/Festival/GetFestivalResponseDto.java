package com.example.back.dto.response.Festival;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.dto.response.Festival.Festivalfiled.GetFestivalImageDto;
import com.example.back.entity.FestivalDescriptionEntity;
import com.example.back.entity.FestivalEntity;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class GetFestivalResponseDto extends ResponseDto {
    private FestivalEntity festivalEntity;
    private FestivalDescriptionEntity festivalDescriptionEntity;
    private GetFestivalImageDto getFestivalImageDto;
    private List<String> markedUserEmails;
    
    public GetFestivalResponseDto(FestivalEntity festivalEntity, FestivalDescriptionEntity festivalDescriptionEntity, GetFestivalImageDto festivalImageDto, List<String> markedUserEmails){
        super();
        this.festivalEntity = festivalEntity;
        this.festivalDescriptionEntity = festivalDescriptionEntity;
        this.getFestivalImageDto = festivalImageDto;
        this.markedUserEmails = markedUserEmails;
    }

    public static ResponseEntity<GetFestivalResponseDto> success(FestivalEntity festivalEntity, FestivalDescriptionEntity festivalDescriptionEntity, GetFestivalImageDto festivalImageDto, List<String> markedUserEmails){
        GetFestivalResponseDto responseBody = new GetFestivalResponseDto();
        responseBody.setFestivalEntity(festivalEntity);
        responseBody.setFestivalDescriptionEntity(festivalDescriptionEntity);
        responseBody.setGetFestivalImageDto(festivalImageDto);
        responseBody.setMarkedUserEmails(markedUserEmails);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

    public static ResponseEntity<ResponseDto> getFestivalFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_FESTIVAL, ResponseMessage.NOT_EXIST_FESTIVAL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
