package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record MaintenanceRecordResponse(
        UUID id,
        UUID vehicleId,
        String vehiclePlate,
        String vehicleModel,
        LocalDate maintenanceDate,
        String description,
        BigDecimal cost,
        boolean approved) {
}
