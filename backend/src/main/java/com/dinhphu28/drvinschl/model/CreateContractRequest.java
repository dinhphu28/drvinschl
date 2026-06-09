package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record CreateContractRequest(
        UUID studentId,
        LocalDateTime appointmentDate,
        LocalDate signedDate,
        BigDecimal contractAmount,
        BigDecimal commissionAmount) {
}
