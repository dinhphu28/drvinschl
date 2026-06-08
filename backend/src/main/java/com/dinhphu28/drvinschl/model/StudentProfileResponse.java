package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.CourseStatus;

public record StudentProfileResponse(
        UUID id,
        String fullName,
        LocalDate dob,
        String phone,
        String coursePackage,
        LocalDate applicationDate,
        LocalDate openingDate,
        LocalDate closingDate,
        LocalDate settlementDate,
        LocalDate certificateReceivedDate,
        boolean registrationFormSubmitted,
        boolean photoSubmitted,
        boolean healthCheckSubmitted,
        LocalDate healthCheckSubmittedDate,
        boolean secondFeePaid,
        boolean finalFeePaid,
        boolean tuitionReminder,
        BigDecimal totalFee,
        BigDecimal paidFee,
        BigDecimal remainingFee,
        CourseStatus courseStatus) {
}
