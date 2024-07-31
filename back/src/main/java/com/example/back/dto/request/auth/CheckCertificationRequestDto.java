package com.example.back.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckCertificationRequestDto {
    @Email
    @NotBlank
    private String userEmail;

    @NotBlank
    private String certificationCode;
}
