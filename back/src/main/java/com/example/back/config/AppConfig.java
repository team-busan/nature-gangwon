package com.example.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        return restTemplate;
    }

    @PostConstruct
    public void init() {
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory(".")
                    .filename(".env")
                    .load();
            String apiKey = dotenv.get("TOURISM_API_KEY");
            String mailKey = dotenv.get("GMAIL_PASSWORD");
            String kakaoOauth2Key = dotenv.get("KAKAO_OAUTH_KEY");
            String kakaoOauthSecretKey = dotenv.get("KAKAO_OAUTH_SECRET_KEY");
            String naverOauth2Key = dotenv.get("NAVER_OAUTH_KEY");
            String naverOauthSecretKey = dotenv.get("NAVER_OAUTH_SECRET_KEY");
            String googleOauth2Key = dotenv.get("GOOGLE_OAUTH_KEY");
            String googleOauthSecretKey = dotenv.get("GOOGLE_OAUTH_SECRET_KEY");
            if (apiKey != null || 
                mailKey != null || 
                kakaoOauth2Key != null || 
                kakaoOauthSecretKey != null || 
                naverOauth2Key != null || 
                naverOauthSecretKey != null ||
                googleOauth2Key != null ||
                googleOauthSecretKey != null) {
                System.setProperty("TOURISM_API_KEY", apiKey);
                System.setProperty("GMAIL_PASSWORD", mailKey);
                System.setProperty("KAKAO_OAUTH_KEY", kakaoOauth2Key);
                System.setProperty("KAKAO_OAUTH_SECRET_KEY", kakaoOauthSecretKey);
                System.setProperty("NAVER_OAUTH_KEY", naverOauth2Key);
                System.setProperty("NAVER_OAUTH_SECRET_KEY", naverOauthSecretKey);
                System.setProperty("GOOGLE_OAUTH_KEY", googleOauth2Key);
                System.setProperty("GOOGLE_OAUTH_SECRET_KEY", googleOauthSecretKey);
            } else {
                throw new RuntimeException("API key not found in .env file");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to load .env file", e);
        }
    }
}
