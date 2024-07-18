package com.example.back.common;

public interface ResponseMessage {
    String SUCCESS = "Success.";

    String VALIDATION_FAIL = "Validation Failed.";
    String DUPLICATE_ID = "Duplicate Id.";

    String SIGN_IN_FAIL = "Login Information Mismatch.";

    String DATABASE_ERROR = "Database Error.";

    String POST_FAIL = "Post Fail.";
    
    String NOT_EXIST_POST = "Not Exist Post.";
    String NOT_EXIST_USER = "Not Exist User.";
    String NOT_EXIST_COMMENT = "Not Exist Comment";
}
