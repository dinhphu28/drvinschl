package com.dinhphu28.drvinschl.model;

import com.dinhphu28.drvinschl.entity.Role;

public record StaffLookupResponse(
        Integer id,
        String username,
        String email,
        String fullName,
        Role role) {
}
