package com.dinhphu28.drvinschl.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.ExamType;

public record ExamSessionResponse(
        UUID id,
        ExamType examType,
        LocalDateTime examDate,
        String location,
        String instructions) {
}
