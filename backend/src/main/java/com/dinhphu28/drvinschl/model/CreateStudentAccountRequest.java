package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateStudentAccountRequest(
        String username,
        String email,
        String password,
        String fullName,
        String phone,
        LocalDate dob,
        String coursePackage,
        BigDecimal totalFee) {
}
