package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

public record RoleResponse(
        UUID id,
        String code,
        String name,
        List<PermissionResponse> permissions) {
}
