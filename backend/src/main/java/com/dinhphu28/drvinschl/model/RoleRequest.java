package com.dinhphu28.drvinschl.model;

import jakarta.validation.constraints.NotBlank;

public record RoleRequest(
        @NotBlank String code,
        @NotBlank String name) {
}
