package com.dinhphu28.drvinschl.model;

import java.time.LocalDate;
import java.util.UUID;

public record VehicleResponse(
        UUID id,
        String licensePlate,
        String model,
        LocalDate registrationExpiry,
        LocalDate learnerLicenseExpiry,
        LocalDate insuranceExpiry,
        String mortgageInfo,
        String ownershipInfo,
        Integer currentOdo,
        boolean clean,
        boolean active) {
}
