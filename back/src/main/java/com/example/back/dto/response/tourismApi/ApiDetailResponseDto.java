package com.example.back.dto.response.tourismApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import java.util.List;

@Data
public class ApiDetailResponseDto {

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
        private String detailTitle;

        @JsonProperty("contentid")
        private String detailContentid;

        @JsonProperty("addr1")
        private String detailAddress;

        @JsonProperty("tel")
        private String detailTel;

        @JsonProperty("mapx")
        private String detailMapx;

        @JsonProperty("mapy")
        private String detailMapy;

        @JsonProperty("firstimage")
        private String detailFirstimage;

        @JsonProperty("firstimage2")
        private String detailFirstimage2;

        @JsonProperty("sigungucode")
        private String detailSigungucode;
    }
}