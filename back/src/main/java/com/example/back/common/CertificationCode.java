package com.example.back.common;

public class CertificationCode {

    public static String getCertificationNumber() {

        String certificationCode = "";

        for (int count = 0; count < 4; count++) certificationCode += (int)(Math.random() * 10);

        return certificationCode;

    }

}
