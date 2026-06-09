package com.dinhphu28.drvinschl.model;

import java.time.LocalDate;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.LeaveStatus;

public record LeaveRequestResponse(
        UUID id,
        Integer teacherId,
        String teacherName,
        LocalDate startDate,
        LocalDate endDate,
        String reason,
        LeaveStatus status) {
}
