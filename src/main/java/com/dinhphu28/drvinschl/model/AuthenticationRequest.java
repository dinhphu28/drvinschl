package com.dinhphu28.drvinschl.model;

import org.jspecify.annotations.NonNull;

// TODO: Validate email or username must be not blank
public record AuthenticationRequest(
        String email,
        String username,
        @NonNull String password) {
}
