package com.dinhphu28.drvinschl.model;

import jakarta.validation.constraints.NotBlank;

public record UserStatusUpdateRequest(
        @NotBlank String status) {
}
