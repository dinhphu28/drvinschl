package com.dinhphu28.drvinschl.model;

import java.time.LocalDate;

public record UpdateStudentProfileRequest(
        String fullName,
        String phone,
        LocalDate dob) {
}
