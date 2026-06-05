package com.dinhphu28.drvinschl.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_learning_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "module" })
})
@Getter
@Setter
public class LearningProgress extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column(name = "module", nullable = false)
    private LearningModule module;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProgressStatus status;

    @Column(name = "completed_hours")
    private Integer completedHours;

    @Column(name = "required_hours")
    private Integer requiredHours;

    @Column(name = "total_km")
    private Integer totalKm;

    @Column(name = "remaining_km")
    private Integer remainingKm;

    @Column(name = "total_minutes")
    private Integer totalMinutes;
}
