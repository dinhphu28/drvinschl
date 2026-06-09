package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record ContractResponse(
        UUID id,
        UUID studentId,
        String studentName,
        LocalDateTime appointmentDate,
        LocalDate signedDate,
        BigDecimal contractAmount,
        BigDecimal commission,
        boolean dossierRegistrationForm,
        boolean dossierPhoto,
        boolean dossierHealthCheck,
        boolean dossierFee) {
}
