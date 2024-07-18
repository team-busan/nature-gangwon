package com.example.back.common;

public interface ResponseCode {
    String SUCCESS = "SU";

    String VALIDATION_FAIL = "VF";
    String DUPLICATE_ID = "DI";

    String SIGN_IN_FAIL = "SF";

    String DATABASE_ERROR = "EBE";

    String POST_FAIL = "PF";
    
    String NOT_EXIST_POST = "NEP";
    String NOT_EXIST_USER = "NEU";
    String NOT_EXIST_COMMENT = "NEC";
}
