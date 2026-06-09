package com.dinhphu28.drvinschl.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.SessionType;

public record TrainingSlotResponse(
        UUID id,
        SessionType sessionType,
        LocalDateTime startTime,
        LocalDateTime endTime,
        boolean available,
        UserSummaryResponse teacher,
        VehicleSummaryResponse vehicle) {
}
