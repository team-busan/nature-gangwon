package com.example.back.controller;

import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.back.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FIleController {
    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(
        @RequestParam(name = "file") MultipartFile file
    ) {
        String response = fileService.upload(file);
        return response;
    }

    @GetMapping("/{fileName}")
    public Resource getFile(
        @PathVariable(name = "fileName") String fileName
    ) {
        Resource resource = fileService.getFile(fileName);
        return resource;
    }
}
