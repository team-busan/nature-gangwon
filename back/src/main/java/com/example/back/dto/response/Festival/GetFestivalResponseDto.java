package com.example.back.dto.response.Festival;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.ResponseDto;
import com.example.back.entity.FestivalEntity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetFestivalResponseDto {
    private FestivalEntity festivalEntity;
    
    public GetFestivalResponseDto(FestivalEntity festivalEntity){
        super();
        this.festivalEntity = festivalEntity;
    }

    public static ResponseEntity<GetFestivalResponseDto> success(FestivalEntity festivalEntity){
        GetFestivalResponseDto responseBody = new GetFestivalResponseDto();
        responseBody.setFestivalEntity(festivalEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

    public static ResponseEntity<ResponseDto> getFestivalFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
