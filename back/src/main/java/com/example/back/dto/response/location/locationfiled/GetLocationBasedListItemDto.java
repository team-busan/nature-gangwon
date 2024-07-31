package com.example.back.dto.response.location.locationfiled;

import java.util.ArrayList;
import java.util.List;

import com.example.back.entity.LocationBasedEntity;

import lombok.Getter;

@Getter
public class GetLocationBasedListItemDto {
    private int locationBasedId;
    private String locationAdd1;
    private String locationContentid;
    private String locationContenttypeid;
    private String locationFirstimage;
    private String locationFirstimage2;
    private String locationMapx;
    private String locationMapy;
    private String locationSigungucode;
    private String locationTitle;

    public GetLocationBasedListItemDto(LocationBasedEntity locationBasedEntity) {
        this.locationBasedId = locationBasedEntity.getLocationBasedId();
        this.locationAdd1 = locationBasedEntity.getLocationAddr1();
        this.locationContentid = locationBasedEntity.getLocationContentid();
        this.locationContenttypeid = locationBasedEntity.getLocationContenttypeid();
        this.locationFirstimage = locationBasedEntity.getLocationFirstimage();
        this.locationFirstimage2 = locationBasedEntity.getLocationFirstimage2();
        this.locationMapx = locationBasedEntity.getLocationMapx();
        this.locationMapy = locationBasedEntity.getLocationMapy();
        this.locationSigungucode = locationBasedEntity.getLocationSigungucode();
        this.locationTitle = locationBasedEntity.getLocationTitle();
    }

    public static List<GetLocationBasedListItemDto> copyList(List<LocationBasedEntity> locationBasedEntityList) {
        List<GetLocationBasedListItemDto> list = new ArrayList<>();

        for(LocationBasedEntity locationBasedEntity : locationBasedEntityList) {
            GetLocationBasedListItemDto dto = new GetLocationBasedListItemDto(locationBasedEntity);
            list.add(dto);
        }
        return list;
    }
}
