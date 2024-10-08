package com.example.back.common;

public interface ResponseCode {
    String SUCCESS = "SU";

    String VALIDATION_FAIL = "VF";
    String DUPLICATE_EMAIL = "DE";
    
    String DUPLICATE_NICKNAME = "DN";

    String SIGN_IN_FAIL = "SF";

    String CERTIFICATION_FAIL = "CF";

    String DATABASE_ERROR = "EBE";

    String POST_FAIL = "PF";
    
    String NOT_EXIST_PLAN = "NEP";
    String NOT_EXIST_USER = "NEU";
    String NOT_EXIST_DETAIL = "NED";
    String NOT_EXIST_FESTIVAL = "NEF";
    String NOT_PERMISSION = "NP";

    String MAIL_FAIL = "MF";

    String INVALID = "I";

    String IT_DOESNT_EXIST = "IDE"; 
}
