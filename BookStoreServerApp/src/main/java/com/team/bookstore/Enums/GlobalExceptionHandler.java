package com.team.bookstore.Enums;

import com.team.bookstore.Dtos.Responses.APIResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.function.EntityResponse;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<APIResponse> exceptionRunTimeHandler(RuntimeException runtimeException){
        log.info("Error: "+ runtimeException);
        ErrorCodes err = ErrorCodes.UN_CATEGORIED;
        return ResponseEntity.badRequest().body(APIResponse.builder()
                .code(err.getCode())
                .message(err.getMessage())
                .build());
    }
    @ExceptionHandler(value = ApplicationException.class)
    ResponseEntity<APIResponse> applicationExceptionHandler(ApplicationException applicationException){
        log.info("Error: " + applicationException);
        return ResponseEntity.badRequest().body(
            APIResponse.builder()
                    .code(applicationException.getErrorCodes().getCode())
                    .message(applicationException.getMessage())
                    .build()
        );

    }
}
