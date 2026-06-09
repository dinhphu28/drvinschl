package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "tbl_student_course_enrollment")
@Getter
@Setter
public class StudentCourseEnrollment extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "course_package", nullable = false)
    private String coursePackage;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_status")
    private CourseStatus courseStatus;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "opening_date")
    private LocalDate openingDate;

    @Column(name = "closing_date")
    private LocalDate closingDate;

    @Column(name = "settlement_date")
    private LocalDate settlementDate;

    @Column(name = "certificate_received_date")
    private LocalDate certificateReceivedDate;

    @Column(name = "total_fee")
    private BigDecimal totalFee;

    @Column(name = "paid_fee")
    private BigDecimal paidFee;

    @Column(name = "primary_course")
    private boolean primaryCourse;
}
