package com.dinhphu28.drvinschl.model;

import org.jspecify.annotations.NonNull;

// TODO: Validate username & email format
// username just allow alphanumeric or _ characters
public record RegisterRequest(
        @NonNull String firstName,
        String lastName,
        String email,
        @NonNull String username,
        @NonNull String password) {
}
