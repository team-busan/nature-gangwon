package com.example.back.common;

public interface ResponseMessage {
    String SUCCESS = "Success.";

    String VALIDATION_FAIL = "Validation Failed.";
    String DUPLICATE_EMAIL = "Duplicate Email.";

    String DUPLICATE_NICKNAME = "Duplicate Nickname.";

    String SIGN_IN_FAIL = "Login Information Mismatch.";

    String CERTIFICATION_FAIL = "Certification Fail.";

    String DATABASE_ERROR = "Database Error.";

    String POST_FAIL = "Post Fail.";
    
    String NOT_EXIST_POST = "Not Exist Post.";
    String NOT_EXIST_USER = "Not Exist User.";
    String NOT_EXIST_COMMENT = "Not Exist Comment.";

    String MAIL_FAIL = "Mail Send Fail.";
}
