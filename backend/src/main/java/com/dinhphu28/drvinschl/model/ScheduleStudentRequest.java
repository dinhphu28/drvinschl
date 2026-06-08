package com.dinhphu28.drvinschl.model;

import java.util.UUID;

import com.dinhphu28.drvinschl.entity.SessionType;

public record ScheduleStudentRequest(
        UUID studentId,
        SessionType sessionType,
        Integer teacherId,
        UUID vehicleId) {
}
