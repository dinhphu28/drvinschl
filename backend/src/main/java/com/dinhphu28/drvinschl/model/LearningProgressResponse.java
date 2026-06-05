package com.dinhphu28.drvinschl.model;

import java.util.UUID;

import com.dinhphu28.drvinschl.entity.LearningModule;
import com.dinhphu28.drvinschl.entity.ProgressStatus;

public record LearningProgressResponse(
        UUID id,
        LearningModule module,
        ProgressStatus status,
        Integer completedHours,
        Integer requiredHours,
        Integer totalKm,
        Integer remainingKm,
        Integer totalMinutes) {
}
