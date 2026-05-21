package com.dinhphu28.drvinschl.model;

import org.jspecify.annotations.NonNull;

public record UserUpdateRequest(
        @NonNull String email) {
}
