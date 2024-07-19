package com.example.back.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

@Service
public class ApiKeyService {
    private final Dotenv dotenv;

    public ApiKeyService() {
        this.dotenv = Dotenv.load();
    }

    public String getTourismApiKey() {
        return dotenv.get("TOURISM_API_KIY");
    }
}
