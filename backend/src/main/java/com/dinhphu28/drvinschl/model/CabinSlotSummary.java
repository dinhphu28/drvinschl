package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;

import com.dinhphu28.drvinschl.entity.SessionType;

public record CabinSlotSummary(
        java.util.UUID id,
        SessionType sessionType,
        java.time.LocalDateTime startTime,
        java.time.LocalDateTime endTime,
        boolean available,
        Integer teacherId,
        String teacherName,
        java.util.UUID vehicleId) {
}
