package com.example.back.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.example.back.dto.request.detail.PatchDetailCommentRequestDto;
import com.example.back.dto.request.detail.PostDetailCommentRequsetDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "detail_comment")
@Table(name = "detail_comment")
public class DetailCommentEntity {
    @Id
    private int detailCommentId;
    private int detailId;
    private String userEmail;
    private String userNickname;
    private String userProfile;
    private String detailContent;
    private int score;
    private String detailUploadDate;

    public DetailCommentEntity(UserEntity userEntity, PostDetailCommentRequsetDto dto){
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.detailId = dto.getDetailId();
        this.userEmail = userEntity.getUserEmail();
        this.userNickname = userEntity.getUserNickname();
        this.userProfile = userEntity.getUserProfile();
        this.detailContent = dto.getDetailContent();
        this.score = dto.getScore();
        this.detailUploadDate = simpleDateFormat.format(now);
    }

    public void patch(PatchDetailCommentRequestDto dto){
        this.detailContent = dto.getDetailContent();
        this.score = dto.getScore();
    }
    @OneToMany(mappedBy = "userEmail")
    private List<DetailCommentLikeEntity> likes;

    public int getLikeCount(){
        return likes == null ? 0 : likes.size();
    }
}
