package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.CourseStatus;

public record StudentCourseEnrollmentResponse(
        UUID id,
        String coursePackage,
        CourseStatus courseStatus,
        LocalDate applicationDate,
        LocalDate openingDate,
        LocalDate closingDate,
        LocalDate settlementDate,
        LocalDate certificateReceivedDate,
        BigDecimal totalFee,
        BigDecimal paidFee,
        BigDecimal remainingFee,
        boolean primaryCourse) {
}
