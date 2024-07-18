package com.example.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
}
