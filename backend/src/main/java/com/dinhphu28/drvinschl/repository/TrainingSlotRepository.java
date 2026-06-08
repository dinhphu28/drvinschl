package com.dinhphu28.drvinschl.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingSlot;

public interface TrainingSlotRepository extends JpaRepository<TrainingSlot, UUID> {
    List<TrainingSlot> findBySessionTypeAndAvailableTrueAndStartTimeAfter(
            SessionType sessionType, LocalDateTime after);

    List<TrainingSlot> findBySessionType(SessionType sessionType);

    List<TrainingSlot> findByStartTimeAfterAndEndTimeBefore(LocalDateTime after, LocalDateTime before);

    List<TrainingSlot> findBySessionTypeAndStartTimeAfterAndEndTimeBefore(
            SessionType sessionType, LocalDateTime after, LocalDateTime before);
}
