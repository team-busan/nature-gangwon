package com.example.back.provider;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailProvider {
    private final JavaMailSender javaMailSender;

    private final String SUBJECT = "[Nature 서비스] 인증메일 입니다.";

    public boolean sendCertificationMail(String userEmail, String certificationCode) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);

            String htmlContent = getCertificationMessage(certificationCode);

            messageHelper.setTo(userEmail);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private String getCertificationMessage(String certificationCode) {
        String certificationMessage = "";
        certificationMessage += "<h1 style='text-align: center;'>[Nature 서비스] 인증메일</h1>";
        certificationMessage += "<h3 style='text-align: center;'>인증코드 : <strong style='font-size: 32px; letter-spacing: 8px;'>" + certificationCode + "<strong></h3>";
        return certificationMessage;
    }
}
