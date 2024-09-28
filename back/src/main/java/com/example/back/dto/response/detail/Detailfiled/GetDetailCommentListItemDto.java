package com.example.back.dto.response.detail.Detailfiled;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetDetailCommentListItemDto {
    private int detailCommentId;
    private String userEmail;
    private int detailId;
    private String userNickname;
    private String userProfile;
    private String detailContent;
    private int score;
    private String detailUploadDate;
    private int likeCount;
    private List<String> likedUserEmails;
}
