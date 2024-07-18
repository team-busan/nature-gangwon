package com.example.back.dto.request.user;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ValidateNicknameRequestDto {
    @NotBlank
    @Length(max = 30)
    private String userNickname;
}
