package com.example.back.entity;

import com.example.back.entity.primaryKey.PlanMarkPK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "plan_mark")
@Table(name = "plan_mark")
@IdClass(PlanMarkPK.class)
public class PlanMarkEntity {
    @Id
    private String userEmail;

    @Id
    private int planId;

    @ManyToOne
    @JoinColumn(name = "plan_id", insertable = false, updatable = false)
    private PlanEntity plan;

    public PlanMarkEntity(UserEntity userEntity, int planId) {
        this.userEmail = userEntity.getUserEmail();
        this.planId = planId;
    }
}
