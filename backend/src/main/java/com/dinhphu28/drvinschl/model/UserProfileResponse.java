package com.dinhphu28.drvinschl.model;

import com.dinhphu28.drvinschl.entity.Role;

public record UserProfileResponse(
        Integer id,
        String username,
        String email,
        String firstName,
        String lastName,
        Role role) {
}
