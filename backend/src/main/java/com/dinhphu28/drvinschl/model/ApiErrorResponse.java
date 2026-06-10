package com.dinhphu28.drvinschl.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiErrorResponse(
        boolean success,
        String errorCode,
        String message,
        Map<String, String> details) {
    public static ApiErrorResponse of(String errorCode, String message) {
        return new ApiErrorResponse(false, errorCode, message, null);
    }

    public static ApiErrorResponse of(String errorCode, String message, Map<String, String> details) {
        return new ApiErrorResponse(false, errorCode, message, details);
    }
}
