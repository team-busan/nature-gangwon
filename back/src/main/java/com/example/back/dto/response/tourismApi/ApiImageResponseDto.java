package com.example.back.dto.response.tourismApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import java.util.List;

@Data
public class ApiImageResponseDto {
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
        @JsonProperty("contentid")
        private String contentid;

        @JsonProperty("originimgurl")
        private String originImageUrl;
    }
}
