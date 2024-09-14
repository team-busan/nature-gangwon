package com.example.back.entity;

import com.example.back.entity.primaryKey.DetailMarkPK;

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
@Entity(name = "detail_mark")
@Table(name = "detail_mark")
@IdClass(DetailMarkPK.class)
public class DetailMarkEntity {
    @Id
    private String userEmail;
    
    @Id
    private int detailId;

    @ManyToOne
    @JoinColumn(name = "detail_id", insertable = false, updatable = false)
    private DetailEntity detail;

    public DetailMarkEntity(UserEntity userEntity, int detailId){
        this.userEmail = userEntity.getUserEmail();
        this.detailId = detailId;
    }
}
