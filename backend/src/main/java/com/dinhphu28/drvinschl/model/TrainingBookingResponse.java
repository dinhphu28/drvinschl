package com.dinhphu28.drvinschl.model;

import java.util.UUID;

import com.dinhphu28.drvinschl.entity.BookingStatus;

public record TrainingBookingResponse(
        UUID id,
        BookingStatus status,
        Integer teacherRating,
        String teacherComment,
        TrainingSlotResponse slot,
        StudentSummaryResponse student) {
}
