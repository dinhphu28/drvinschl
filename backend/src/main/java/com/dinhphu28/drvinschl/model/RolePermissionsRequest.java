package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record RolePermissionsRequest(
        @NotNull List<UUID> permissionIds) {
}
