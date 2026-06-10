package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserCreateRequest(
        @NotBlank String username,
        @NotBlank String fullName,
        String phone,
        @Email String email,
        @NotBlank String password,
        @NotBlank String status,
        @NotNull List<UUID> roleIds) {
}
