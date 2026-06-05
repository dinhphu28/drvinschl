package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.PaymentType;

public record PaymentRequest(
        UUID studentId,
        PaymentType paymentType,
        BigDecimal amount,
        String note) {
}
