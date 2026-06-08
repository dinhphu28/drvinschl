package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.util.UUID;

public record RefundRequest(
        UUID studentId,
        BigDecimal amount,
        String note) {
}
