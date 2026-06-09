package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record FuelRecordResponse(
        UUID id,
        UUID vehicleId,
        String vehiclePlate,
        Integer teacherId,
        String teacherName,
        LocalDate fuelDate,
        BigDecimal liters,
        String receiptUrl,
        BigDecimal amount) {
}
