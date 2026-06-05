package com.dinhphu28.drvinschl.model;

import com.dinhphu28.drvinschl.entity.Role;

public record CreateUserRequest(
        String username,
        String email,
        String firstName,
        String lastName,
        String password,
        Role role) {
}
