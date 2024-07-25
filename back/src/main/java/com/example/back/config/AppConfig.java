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
                    .directory("back/.env")
                    .filename(".env")
                    .load();
            String apiKey = dotenv.get("TOURISM_API_KEY");
            if (apiKey != null) {
                System.setProperty("TOURISM_API_KEY", apiKey);
            } else {
                throw new RuntimeException("API key not found in .env file");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to load .env file", e);
        }
    }
}
