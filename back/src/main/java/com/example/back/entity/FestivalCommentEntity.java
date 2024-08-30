package com.example.back.entity;

import com.example.back.dto.request.festival.PostFestivalCommentRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "festival_comment")
@Table(name = "festival_comment")
public class FestivalCommentEntity {
    @Id
    private int festivalCommentId;
    private int festivalId;
    private String userEmail;
    private String userNickname;
    private String userProfile;
    private String festivalContent;
    private int score;
    private String festivalUploadDate;

    public FestivalCommentEntity(UserEntity userEntity, PostFestivalCommentRequestDto dto){
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.festivalId = dto.getFestivalId();
        this.userEmail = userEntity.getUserEmail();
        this.userNickname = userEntity.getUserNickname();
        this.userProfile = userEntity.getUserProfile();
        this.festivalContent = dto.getFestivalContent();
        this.festivalUploadDate = simpleDateFormat.format(now);
    }
}
