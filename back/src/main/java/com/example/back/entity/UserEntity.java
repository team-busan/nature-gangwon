package com.example.back.entity;

import java.util.Random;

import com.example.back.dto.request.auth.SignUpRequestDto;

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

    public UserEntity (SignUpRequestDto dto) {
        this.userEmail = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userNickname = dto.getUserNickname();
        this.userProfile = getDefaultProfileUrl();
        this.type = "App";
    }

    public UserEntity(String userId, String type) {
        this.userEmail = userId;
        this.userPassword = "!q2W3e#r";
        this.userNickname = generateRandomNickname();
        this.userProfile = getDefaultProfileUrl();
        this.type = type;
    }

    private String generateRandomNickname() {
        Random random = new Random();
        return "user" + String.format("%04d", random.nextInt(10000));
    }

    private String getDefaultProfileUrl() {
        return "/image/profile.jpg";
    }
}
