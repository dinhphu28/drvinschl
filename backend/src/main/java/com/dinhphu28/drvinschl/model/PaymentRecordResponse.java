package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.PaymentType;

public record PaymentRecordResponse(
        UUID id,
        UUID studentId,
        String studentName,
        PaymentType paymentType,
        BigDecimal amount,
        LocalDateTime paidAt,
        String note) {
}
