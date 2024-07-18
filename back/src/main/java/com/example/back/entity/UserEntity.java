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
@Entity(name = "user")
@Table(name = "user")
public class UserEntity {
    @Id
    private String userEmail;
    private String userPassword;
    private String userNickname;
    private String userProfile;
    private String type;
}
