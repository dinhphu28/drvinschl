package com.dinhphu28.drvinschl.model;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(
        @NotBlank String newPassword) {
}
