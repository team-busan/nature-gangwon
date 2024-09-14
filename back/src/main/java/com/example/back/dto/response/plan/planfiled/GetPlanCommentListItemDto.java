package com.example.back.dto.response.plan.planfiled;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetPlanCommentListItemDto {
    private int planCommentId;
    private String userEmail;
    private int planId;
    private String userNickname;
    private String userProfile;
    private String planContent;
    private String planUploadDate;
    private int likeCount;
    private List<String> likedUserEmails;
}
