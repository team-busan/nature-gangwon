package com.example.back.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.back.entity.CustomOauth2User;
import com.example.back.provider.JwtProvider;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Oauth2Successhandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    @Override
	public void onAuthenticationSuccess(
        HttpServletRequest request, 
        HttpServletResponse response,
		Authentication authentication
    ) throws IOException, ServletException {
		CustomOauth2User oauth2User = (CustomOauth2User) authentication.getPrincipal();
        String userId = oauth2User.getName();
        String token = jwtProvider.create(userId);

        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + token + "/3600");
	}
}