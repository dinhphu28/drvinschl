package com.dinhphu28.drvinschl.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_session_report")
@Getter
@Setter
public class SessionReport extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "booking_id")
    private TrainingBooking booking;

    @Enumerated(EnumType.STRING)
    @Column(name = "session_type", nullable = false)
    private SessionType sessionType;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "km")
    private Integer km;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "dat_screenshot_url")
    private String datScreenshotUrl;

    @Column(name = "attendance_marked")
    private boolean attendanceMarked;

    @Column(name = "student_dropped")
    private boolean studentDropped;
}
