package com.example.back.dto.response.Festival.Festivalfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetFestivalCommentListItemDto {
    private int festivalCommentId;
    private String userEmail;
    private int festivalId;
    private String userNickname;
    private String userProfile;
    private String festivalContent;
    private int score;
    private String festivalUploadDate;
    private int likeCount;
}
