package com.team.bookstore.Enums;

import lombok.Getter;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
@Getter
public enum ErrorCodes {
    UN_CATEGORIED(10,"This exception is unknown!",HttpStatus.INTERNAL_SERVER_ERROR),
    UN_AUTHENTICATED(11,"Neither username or password is incorrect!",HttpStatus.NOT_ACCEPTABLE),
    UN_AUTHORIZED(12,"You are not authorized to access!",HttpStatus.UNAUTHORIZED),
    USER_NOT_EXIST(13,"User {user} is not exist!",HttpStatus.BAD_REQUEST)
    ;
    int code;
    String message;
    HttpStatus httpStatus;
    ErrorCodes(int code,String message, HttpStatus httpStatus){
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

}
