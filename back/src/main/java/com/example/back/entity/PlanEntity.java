package com.example.back.entity;

import java.util.Date;


import java.text.SimpleDateFormat;

import com.example.back.dto.request.plan.PatchPlanRequestDto;
import com.example.back.dto.request.plan.PostPlanRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "plan")
@Table(name = "plan")
public class PlanEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int planId;
    private String userEmail;
    private String startDate;
    private String endDate;
    private String planUploadDate;
    private String planTitle;
    private int planCount;

    public PlanEntity(UserEntity userEntity, PostPlanRequestDto postPlanRequestDto) {
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.userEmail = userEntity.getUserEmail();
        this.startDate = postPlanRequestDto.getStartDate();
        this.endDate = postPlanRequestDto.getEndDate();
        this.planTitle = postPlanRequestDto.getPlanTitle();
        this.planUploadDate = simpleDateFormat.format(now);
        this.planCount = 0;
    }

    public void increasePlanCount() {
        this.planCount++;
    }

    public void patch(PatchPlanRequestDto dto) {
        this.planTitle = dto.getPlanTitle();
        this.startDate = dto.getStartDate();
        this.endDate = dto.getEndDate();
    }

    @Transient
    private int markCount;

    public int getMarkCount() {
        return markCount;
    }

    public void setMarkCount(int markCount) {
        this.markCount = markCount;
    }

}
