package com.example.back.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PatchUserPasswordRequestDto {
    @Email
    @NotBlank
    private String userEmail;

    @NotBlank
    private String userPassword;
}
