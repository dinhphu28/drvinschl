package com.dinhphu28.drvinschl.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_exam_session")
@Getter
@Setter
public class ExamSession extends AbstractAuditableEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type", nullable = false)
    private ExamType examType;

    @Column(name = "exam_date", nullable = false)
    private LocalDateTime examDate;

    @Column(name = "location")
    private String location;

    @Column(name = "instructions")
    private String instructions;
}
