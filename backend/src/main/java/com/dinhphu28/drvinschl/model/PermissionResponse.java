package com.dinhphu28.drvinschl.model;

import java.util.UUID;

public record PermissionResponse(
        UUID id,
        String code,
        String name) {
}
