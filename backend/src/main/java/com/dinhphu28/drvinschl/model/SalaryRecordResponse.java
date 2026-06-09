package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.util.UUID;

public record SalaryRecordResponse(
        UUID id,
        Integer teacherId,
        String teacherUsername,
        String teacherName,
        String month,
        BigDecimal baseSalary,
        BigDecimal bonus,
        BigDecimal totalAmount,
        boolean approvedByAdmin,
        boolean approvedByDirector) {
}
