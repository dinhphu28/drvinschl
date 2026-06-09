package com.dinhphu28.drvinschl.model;

import java.util.UUID;

public record VehicleSummaryResponse(UUID id, String licensePlate, String model) {
}
