package com.example.back.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class EmailCertificationRequestDto {
    @NotBlank
    @Email
    private String userEmail;
    
}
