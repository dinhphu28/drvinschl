package com.dinhphu28.drvinschl.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.SessionType;

public record CreateTrainingSlotRequest(
        SessionType sessionType,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Integer teacherId,
        UUID vehicleId) {
}
