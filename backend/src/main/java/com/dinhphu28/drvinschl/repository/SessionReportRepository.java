package com.dinhphu28.drvinschl.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.SessionReport;
import com.dinhphu28.drvinschl.entity.User;

public interface SessionReportRepository extends JpaRepository<SessionReport, UUID> {
    List<SessionReport> findByBookingSlotTeacherAndStartTimeBetween(User teacher, LocalDateTime start, LocalDateTime end);
}
