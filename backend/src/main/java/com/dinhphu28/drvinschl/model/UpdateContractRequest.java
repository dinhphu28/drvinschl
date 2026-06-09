package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record UpdateContractRequest(
        LocalDateTime appointmentDate,
        LocalDate signedDate,
        BigDecimal contractAmount,
        BigDecimal commissionAmount) {
}
