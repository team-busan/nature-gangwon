package com.example.back.dto.response.tourismApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import java.util.List;

@Data
public class ApiFestivalResponseDto {
    private Response response;

    @Data
    public static class Response {
        private Header header;
        private Body body;
    }

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Body {
        private Items items;
        private int numOfRows;
        private int pageNo;
        private int totalCount;
    }

    @Data
    public static class Items {
        private List<Item> item;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Item {
        @JsonProperty("title")
        private String festivalTitle;

        @JsonProperty("contentid")
        private String festivalContentid;

        @JsonProperty("addr1")
        private String festivalAddress;

        @JsonProperty("tel")
        private String festivalTel;

        @JsonProperty("eventstartdate")
        private String festivalStartDate;

        @JsonProperty("eventenddate")
        private String festivalEndDate;

        @JsonProperty("mapx")
        private String festivalMapx;

        @JsonProperty("mapy")
        private String festivalMapy;

        @JsonProperty("firstimage")
        private String festivalFirstimage;

        @JsonProperty("firstimage2")
        private String festivalFirstimage2;

        @JsonProperty("sigungucode")
        private String festivalSigungucode;
    }
}