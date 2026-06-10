package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String username,
        String fullName,
        String phone,
        String email,
        String status,
        List<String> roles) {
}
