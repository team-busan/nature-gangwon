package com.example.back.service.implement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.back.service.FileService;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImplement implements FileService {
    @Value("${file.path}")
    private String FILE_PATH;

    @Value("${file.url}")
    private String FILE_URL;

    @Override
    public String upload(MultipartFile file) {
        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();

        String saveName = uuid + extension;
        String savePath = FILE_PATH + saveName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = FILE_URL + saveName;
        return url;
    }

    @Override
    public Resource getFile(String fileName) {
        Resource resource = null;

        try {
            resource = new UrlResource("file:" + FILE_PATH + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }
    
}
