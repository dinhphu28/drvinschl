package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record CreateStudentCourseEnrollmentRequest(
        UUID studentId,
        String coursePackage,
        BigDecimal totalFee,
        LocalDate applicationDate) {
}
