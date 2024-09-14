package com.example.back.entity;

import com.example.back.entity.primaryKey.FestivalMarkPK;

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
@Entity(name = "festival_mark")
@Table(name = "festival_mark")
@IdClass(FestivalMarkPK.class)
public class FestivalMarkEntity {
    @Id
    private String userEmail;
    
    @Id
    private int festivalId;

    @ManyToOne
    @JoinColumn(name = "festival_id", insertable =  false, updatable = false)
    private FestivalEntity festival;

    public FestivalMarkEntity(UserEntity userEntity, int festivalId){
        this.userEmail = userEntity.getUserEmail();
        this.festivalId = festivalId;
    }
}
