package com.dinhphu28.drvinschl.model;

import java.util.UUID;

public record StudentLookupResponse(
        UUID id,
        String username,
        String fullName,
        String phone,
        String coursePackage,
        String courseStatus) {
}
