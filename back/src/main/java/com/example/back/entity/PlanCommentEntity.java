package com.example.back.entity;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.example.back.dto.request.plan.PatchPlanCommentRequestDto;
import com.example.back.dto.request.plan.PostPlanCommentRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "plan_comment")
@Table(name = "plan_comment")
public class PlanCommentEntity {
    @Id
    private int planCommentId;
    private String userEmail;
    private int planId;
    private String userNickname;
    private String userProfile;
    private String planContent;
    private String planUploadDate;

    public PlanCommentEntity(UserEntity userEntity, PostPlanCommentRequestDto dto){
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.planId = dto.getPlanId();
        this.userEmail = userEntity.getUserEmail();
        this.userNickname = userEntity.getUserNickname();
        this.userProfile = userEntity.getUserProfile();
        this.planContent = dto.getPlanContent();
        this.planUploadDate = simpleDateFormat.format(now);
    }

    public void patch(PatchPlanCommentRequestDto dto) {
        this.planContent = dto.getPlanContent();
    }

    @OneToMany(mappedBy = "userEmail")
    private List<PlanCommentLikeEntity> likes;

    public int getLikeCount() {
        return likes == null ? 0 : likes.size();
    }
}
