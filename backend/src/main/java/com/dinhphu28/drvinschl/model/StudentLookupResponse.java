package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

public record StudentLookupResponse(
        UUID id,
        String username,
        String fullName,
        String phone,
        String coursePackage,
        List<String> coursePackages,
        String courseStatus) {
}
